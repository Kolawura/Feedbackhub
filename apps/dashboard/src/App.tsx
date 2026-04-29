import { Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import Feedback from "./Pages/Feedback";
import FeedbackDetail from "./Components/Feedbacks/[id]";
import { RegisterForm } from "./Pages/RegisterForm";
import { LoginForm } from "./Pages/LoginForm";
import { Analytics } from "./Pages/Analytics";
import { Home } from "./Pages/Home";
import { PublicRoute } from "./Components/Routes/PublicRoute";
import { ProtectedRoute } from "./Components/Routes/ProtectedRoute";
import { DashboardRoute } from "./Components/Routes/DashboardRoute";
import { AuthRoute } from "./Components/Routes/AuthRoute";
import LoadingPage from "./Pages/LoadingPage";
import { SetupPage } from "./Pages/SetupPage";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/useThemeStore";
import ErrorPage from "./Pages/ErrorPage";
import { useAuth } from "./Hooks/useAuth";
import NotFoundPage from "./Pages/NotFoundPage";
import { Settings } from "./Pages/Settings";
import { ForgotPasswordPage } from "./Pages/ForgetPassword";
import { ResetPasswordPage } from "./Pages/ResetPassword";
import { VerifyEmailPage } from "./Pages/VerifyEmail";
import { VisitorsPage } from "./Pages/Visitor";
import { VisitorDetailPage } from "./Pages/VisitorsDetail";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { theme, isSystemDefault, setSystemTheme } = useThemeStore();
  const { loading, error } = useAuth();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!isSystemDefault) return;
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", handleSystemThemeChange);
    return () => mq.removeEventListener("change", handleSystemThemeChange);
  }, [isSystemDefault, setSystemTheme]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHover(false);
    }, 100);
  };
  const Expand = !isCollapsed || isHover;

  if (loading) {
    return <LoadingPage />;
  }

  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <DashboardRoute
                Expand={Expand}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feedbacks" element={<Feedback />} />
            <Route path="/visitors" element={<VisitorsPage />} />
            <Route
              path="/visitors/:visitorId"
              element={<VisitorDetailPage />}
            />
            <Route path="/feedback/:id" element={<FeedbackDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
