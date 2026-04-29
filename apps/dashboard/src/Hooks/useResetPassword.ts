import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/axios";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { token, password });
      setDone(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Reset link is invalid or has expired. Please request a new one.",
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    password,
    setPassword,
    confirm,
    setConfirm,
    showPass,
    setShowPass,
    showConfirm,
    setShowConfirm,
    loading,
    done,
    error,
    handleSubmit,
  };
};
