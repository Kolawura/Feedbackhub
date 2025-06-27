import { useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { fetch } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser, loading, setLoading } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        console.log("Fetching user...");

        const res = await fetch.get("/api/auth/me", {
          signal: controller.signal,
        });

        if (!isMounted) return;
        setUser(res.data.data);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.log("Session expired, refreshing...", err);

        try {
          await fetch.post("/api/auth/refresh-token", {
            signal: controller.signal,
          });

          const meRes = await fetch.get("/api/auth/me", {
            signal: controller.signal,
          });

          if (!isMounted) return;
          setUser(meRes.data.data);
        } catch (refreshError) {
          console.error("Refresh failed:", refreshError);
          logoutUser();
          // navigate("/");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log("Loading complete");
        }
      }
    };

    fetchUser();
    setLoading(false);

    return () => {
      isMounted = false;
      controller.abort();
      console.log("Cleanup done");
    };
  }, [user]);

  const login = async (data: { emailOrUsername: string; password: string }) => {
    try {
      const res = await fetch.post("/api/auth/login", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
      return res;
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      console.error("Login error:", err);
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
      const res = await fetch.post("/api/auth/register", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      toast.success("Registration successful! Welcome!");
      navigate("/dashboard/setup");
      return res;
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const logout = async () => {
    try {
      await fetch.post("/api/auth/logout", null, {
        withCredentials: true,
      });
      logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };
  console.log(loading);

  return {
    user,
    loading,
    login,
    registerAdmin,
    logout,
    isAuthenticated: !!user,
  };
};
