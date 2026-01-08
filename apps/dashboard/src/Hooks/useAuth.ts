import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getMe,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../lib/auth";

export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 23 * 60 * 60 * 1000,
  });

  const login = useMutation({
    mutationFn: loginRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Welcome back!");
      const from = location.state?.from?.pathname || "/dashboard";

      navigate(from, { replace: true });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });

  const registerAdmin = useMutation({
    mutationFn: registerRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Registration successful!");
      navigate("/setup");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Registration failed");
    },
  });

  const logout = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out");
      navigate("/");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return {
    user,
    loading: isLoading,
    error,
    login: login.mutateAsync,
    registerAdmin: registerAdmin.mutateAsync,
    logout: logout.mutateAsync,
  };
};
