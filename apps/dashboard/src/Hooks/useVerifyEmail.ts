import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/axios";
import { Status } from "../Type";

export const useVerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

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
  };
};
