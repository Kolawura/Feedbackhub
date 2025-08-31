import { Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import Feedback from "./Pages/Feedback";
import FeedbackDetail from "./Components/Feedbacks/[id]";
import { RegisterForm } from "./Pages/RegisterForm";
import { LoginForm } from "./Pages/LoginForm";
import AnalyticsPage from "./Pages/Analytics";
import { Home } from "./Pages/Home";
import { PublicLayout } from "./Components/Layout/PublicLayout";
import { ProtectedRoute } from "./Components/auth/ProtectedRoute";
import { DashboardLayout } from "./Components/Layout/DashboardLayout";
import { AuthLayout } from "./Components/Layout/AuthLayout";
import LoadingPage from "./Pages/LoadingPage";
import { SetupPage } from "./Pages/SetupPage";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/useThemeStore";
import ErrorPage from "./Pages/ErrorPage";
import { useAuthStore } from "./Store/useAuthStore";
import { useAuth } from "./Hooks/useAuth";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { theme } = useThemeStore();
  const { loading, error } = useAuth();

  console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
  if (error) return <ErrorPage errorMessage={error} />;

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/setup" element={<SetupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <DashboardLayout
                Expand={Expand}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feedbacks" element={<Feedback />} />
            <Route path="/feedback/:id" element={<FeedbackDetail />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
