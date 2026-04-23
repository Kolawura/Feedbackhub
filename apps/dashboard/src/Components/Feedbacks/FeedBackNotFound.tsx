import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function FeedbackNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-4 p-6">
      <AlertTriangle size={24} className="text-[var(--amber)]" />
      <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
        Feedback not found
      </p>
      <button
        onClick={() => navigate("/feedbacks")}
        className="font-mono text-xs text-[var(--amber)] hover:opacity-70 transition-opacity"
      >
        ← Back to feedbacks
      </button>
    </div>
  );
}
