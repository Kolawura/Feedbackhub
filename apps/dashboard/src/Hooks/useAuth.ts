import { useCallback, useEffect, useRef } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { fetch } from "../lib/axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser, loading, setLoading, setError, error } =
    useAuthStore();
  const { pathname } = useLocation();
  let isMounted = true;
  const controller = new AbortController();
  const refreshAttempted = useRef(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching user...");
      const res = await fetch.get("/api/auth/me", {
        signal: controller.signal,
      });
      console.log("User fetched successfully:", res.data.data);
      setUser(res.data.data);
    } catch (err: any) {
      console.error("Session expired, refreshing...", err);
      setError("Session expired. Attempting refresh...");
      if (!isMounted) return;
      if (!refreshAttempted.current) {
        refreshAttempted.current = true;
        try {
          await fetch.post(
            "/api/auth/refresh-token",
            {},
            { signal: controller.signal }
          );

          const res = await fetch.get("/api/auth/me", {
            signal: controller.signal,
          });

          if (!isMounted) return;
          setUser(res.data.data);
          setError(null);
        } catch (refreshError: any) {
          console.error("Refresh failed:", refreshError);
          setError(`Authentication failed.${refreshError.message}`);
          logoutUser();
        }
      } else {
        console.error("Already attempted refresh. Logging out.");
        logoutUser();
      }
    } finally {
      if (isMounted) {
        setLoading(false);
        console.log("Loading complete");
      }
    }
  };

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
      console.log("Skipping user fetch on auth pages");
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    isMounted = true;
    fetchUser();
    return () => {
      isMounted = false;
      controller.abort();
      console.log("effect cleanup");
    };
  }, []);

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
      const res = await fetch.post("/api/auth/login", data, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
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
      const res = await fetch.post("/api/auth/register", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      toast.success("Registration successful! Welcome!");
      navigate("/setup");
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
      const res = await fetch.post("/api/auth/logout", null, {
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
