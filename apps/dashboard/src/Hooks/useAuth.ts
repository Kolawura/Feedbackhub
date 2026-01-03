import { useCallback, useEffect, useRef } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { api } from "../lib/axios";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { loadSites } from "./useFetch";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser, loading, setLoading, setError, error } =
    useAuthStore();
  const { pathname } = useLocation();
  const isMounted = useRef(true);
  const refreshAttempted = useRef(false);

  const fetchUser = async (controller: AbortController): Promise<boolean> => {
    try {
      // setLoading(true);
      setError(null);
      console.log("Fetching user...");
      const res = await api.get("/api/auth/me", {
        signal: controller.signal,
      });
      console.log("User fetched successfully:", res.data.data);

      setUser(res.data.data);
      return true;
    } catch (err: any) {
      console.error("Session expired, refreshing...", err);
      setError("Session expired. Attempting refresh...");
      if (!isMounted.current) return false;
      if (controller.signal.aborted) return false;
      if (!refreshAttempted.current) {
        refreshAttempted.current = true;
        try {
          await api.post(
            "/api/auth/refresh-token",
            {},
            { signal: controller.signal }
          );

          const res = await api.get("/api/auth/me", {
            signal: controller.signal,
          });

          if (!isMounted.current) return false;
          setUser(res.data.data);
          setError(null);
          return true;
        } catch (refreshError: any) {
          console.error("Refresh failed:", refreshError);
          setError(`Authentication failed.${refreshError.message}`);
          logoutUser();
          return false;
        }
      } else {
        console.error("Already attempted refresh. Logging out.");
        logoutUser();
        return false;
      }
    } finally {
      if (isMounted.current) {
        // setLoading(false);
        console.log("Loading complete");
      }
    }
  };

  useEffect(() => {
    if (user) return;
    if (pathname === "/login" || pathname === "/register") {
      console.log("Skipping user fetch on auth pages");
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    isMounted.current = true;

    const init = async () => {
      const success = await fetchUser(controller);
      if (!isMounted.current || !success) return;

      await loadSites();
      setLoading(false);
    };

    init();
    return () => {
      isMounted.current = false;
      controller.abort();
      console.log("effect cleanup");
    };
  }, [user, pathname]);

  const extractErrorMessage = (
    err: unknown,
    fallback = "Something went wrong"
  ) => {
    if (err instanceof AxiosError) {
      return err.response?.data?.message || err.message || fallback;
    } else if (err instanceof Error) {
      return err.message || fallback;
    }
    return fallback;
  };
  const login = async (data: { identifier: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/api/auth/login", data, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(res.data.user);
      navigate("/dashboard");
      toast.success("Welcome back!");
      return { success: true, user: res.data.user };
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "Login failed. Check credentials."
      );
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const registerAdmin = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/api/auth/register", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      navigate("/setup");
      toast.success("Registration successful! Welcome!");
      return { success: true, user: res.data.user };
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "Registration failed. Please try again."
      );
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/api/auth/logout", null, {
        withCredentials: true,
      });
      logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "Logout failed. Please try again."
      );
      setError(message);
      toast.error(message);
    }
  };
  console.log(loading, error);

  return {
    loading,
    error,
    login,
    registerAdmin,
    logout,
  };
};
