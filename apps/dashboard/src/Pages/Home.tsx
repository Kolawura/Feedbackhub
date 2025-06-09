import React from "react";
import { Button } from "../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Step } from "../Components/Home/Step";
import { Feature } from "../Components/Home/Feature";
import {
  ChartNoAxesColumn,
  LockKeyholeOpen,
  LogIn,
  MessageCircleMore,
  UserPlus,
} from "lucide-react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-outfit min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
      <section className="text-center space-y-8 py-20 px-4 md:px-8">
        <h1 className="flex items-start justify-center gap-4 text-4xl md:text-6xl font-bold leading-tight">
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
            Login
            <LogIn size={15} />
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

      {/* Why FeedbackHub */}
      <section className="py-20 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why FeedbackHub?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon="🔧"
            title="Simple Integration"
            description="Just copy a small script into your website and start collecting feedback instantly — no complex setup required."
          />
          <Feature
            icon={<ChartNoAxesColumn color="blue" size={25} />}
            title="Actionable Analytics"
            description="Understand your users' journey and improve their experience."
          />
          <Feature
            icon="⚒️"
            title="Custom Feedback Forms"
            description="Collect bugs, feature requests, and suggestions with customizable forms."
          />
          <Feature
            icon="🔒"
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
