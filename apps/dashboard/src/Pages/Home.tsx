import { Button } from "../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Step } from "../Components/Home/Step";
import { Feature } from "../Components/Home/Feature";
import {
  LockKeyhole,
  LogIn,
  MessageCircleMore,
  UserPlus,
  Wrench,
} from "lucide-react";
import HeroSection from "../Components/Home/HeroSection";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-outfit min-h-screen text-gray-900 dark:text-gray-100 transition-all duration-200">
      <section className="text-center space-y-8 py-20 px-4 md:px-8">
        <h1 className="flex items-center justify-center gap-4 text-4xl md:text-6xl font-bold leading-tight">
          <MessageCircleMore size={60} /> Collect Feedback. Improve Experiences.
        </h1>
        <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          FeedbackHub makes it easy to collect user feedback, track visitor
          behavior, and turn insights into better decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button
            onClick={() => navigate("/login")}
            className="rounded-3xl p-6 gap-2"
          >
            <LogIn size={15} />
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/register")}
            className="rounded-3xl gap-2 p-6"
          >
            <UserPlus size={16} /> Register
          </Button>
        </div>
      </section>
      <HeroSection />
      <section className="py-20 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why FeedbackHub?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Wrench />}
            title="Simple Integration"
            description="Just copy a small script into your website and start collecting feedback instantly — no complex setup required."
          />
          <Feature
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            }
            title="Actionable Analytics"
            description="Understand your users' journey and improve their experience."
          />
          <Feature
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
            }
            title="Custom Feedback Forms"
            description="Collect bugs, feature requests, and suggestions with customizable forms."
          />
          <Feature
            icon={<LockKeyhole />}
            title="Secure & Private"
            description="All feedback is stored securely and accessible only to you."
          />
        </div>
      </section>
      <section className="bg-white dark:bg-white/3 rounded-xl py-20 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Step
            number="1"
            title="Sign Up"
            description="Create an account in less than a minute."
          />
          <Step
            number="2"
            title="Add Your Site"
            description="Tell us which site you want to track."
          />
          <Step
            number="3"
            title="Install the Script"
            description="Get a script tag and embed it in your site."
          />
          <Step
            number="4"
            title="Collect Feedback & Insights"
            description="Watch feedback and analytics appear in your dashboard."
          />
        </div>
      </section>
      <section className="text-center py-20 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Ready to understand your users better?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => navigate("/register")}>👉 Register Now</Button>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login to Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
};
