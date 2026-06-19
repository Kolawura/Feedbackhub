import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/axios";
import { Status } from "../Type";
import toast from "react-hot-toast";

export const useVerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  // For EmailVerificationBanner component
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the link.");
      return;
    }

    api
      .get(`/api/auth/verify-email?token=${token}`)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setMessage(
          err?.response?.data?.message ||
            "Verification link is invalid or has expired.",
        );
      });
  }, [searchParams]);

  const handleResend = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      await api.post("/api/auth/resend-verification", { email });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  // For EmailVerificationBanner component
  const resend = async (email: string) => {
    setSending(true);
    try {
      await api.post("/api/auth/resend-verification", { email: email });
      toast.success("Verification email sent — check your inbox.");
    } catch {
      toast.success("If your email is registered, a link has been sent.");
    } finally {
      setSending(false);
    }
  };

  return {
    status,
    message,
    email,
    setEmail,
    sent,
    loading,
    showInput,
    setShowInput,
    handleResend,
    resend, // For EmailVerificationBanner component
    dismissed, // For EmailVerificationBanner component
    setDismissed, // For EmailVerificationBanner component
    sending, // For EmailVerificationBanner component
  };
};
