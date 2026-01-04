import { useState } from "react";
import {
  CheckCircle,
  Check,
  Copy,
  Code,
  FileCode,
  Settings,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSetupStore } from "../Store/useSetupStore";
import { useSites } from "../Hooks/useSite";

export const SetupPage = () => {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-gray-900 dark:text-gray-100 transition-colors">
      <WelcomeHeader />
      <div className="grid gap-8 mt-8">
        <SetupWidget />
        <NextSteps />
      </div>
    </div>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm font-medium">
          Account successfully created
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Welcome to FeedbackHub
      </h1>

      <p className="text-muted-foreground lg:text-lg text-md max-w-3xl">
        You're just one step away from collecting valuable feedback from your
        users. Set up your feedback widget by generating a script tag to add to
        your website.
      </p>
    </div>
  );
};

const SetupWidget = () => {
  const [scriptGenerated, setScriptGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [webName, setWebName] = useState("");
  const [siteId, setSiteId] = useState("");

  const widgetPosition = useSetupStore((state) => state.widgetPosition);
  const setWidgetPosition = useSetupStore((state) => state.setWidgetPosition);
  const { sitesQuery, addSiteMutation } = useSites();

  const scriptTag = siteId
    ? `<script src="https://feedbackhub.io/widget.js" data-fhub-id="${siteId}" data-position="${widgetPosition}"></script>`
    : "";

  const generateSite = () => {
    if (!webName) return toast.error("Please enter a website name");

    addSiteMutation.mutate(webName, {
      onSuccess: (data) => {
        if (data?.newSite) {
          setSiteId(data.newSite.siteId);
          setScriptGenerated(true);
        }
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to create site");
      },
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  const setupLoading = addSiteMutation.isPending;

  return (
    <div className="rounded-lg border bg-white dark:bg-white/3 border-gray-300 dark:border-gray-700 transition-colors bg-card text-card-foreground shadow-md">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-xl font-semibold">Set up your feedback widget</h3>
        <p className="text-sm text-muted-foreground">
          Generate a custom script tag to embed the FeedbackHub widget on your
          website
        </p>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
          <label htmlFor="website-url" className="text-sm font-medium">
            Website Name
          </label>
          <input
            id="website-url"
            className="w-full p-2 rounded-md bg-white dark:bg-white/3 text-sm text-gray-800 dark:text-white focus:outline-none focus:shadow-md focus:ring-blue-300 focus:border-blue-300 border border-gray-300 dark:border-gray-600 transition duration-200"
            placeholder="yourwebsite"
            value={webName}
            onChange={(e) => setWebName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="widget-position" className="text-sm font-medium">
            Widget Position
          </label>
          <select
            id="widget-position"
            className="w-full p-2 rounded-md bg-white dark:bg-white/3 text-sm text-gray-800 dark:text-white focus:outline-none focus:shadow-md focus:ring-blue-300 focus:border-blue-300 border border-gray-300 dark:border-gray-600 transition duration-200"
            value={widgetPosition}
            onChange={(e) => setWidgetPosition(e.target.value as "bottom-right" | "bottom-left" | "top-right" | "top-left")}
          >
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
          </select>
        </div>

        {scriptGenerated && (
          <div className="space-y-2 mt-4">
            <label htmlFor="script-tag" className="text-sm font-medium">
              Your Widget Script
            </label>
            <div className="relative">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md font-mono md:text-sm overflow-x-auto">
                {scriptTag}
              </div>
              <button
                className="absolute right-2 top-2 inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 bg-transparent hover:bg-accent/50"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy to clipboard</span>
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Add this script tag to the <code>&lt;head&gt;</code> section of
              your website.
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center p-6 pt-0">
        {!scriptGenerated ? (
          <button
            onClick={generateSite}
            disabled={setupLoading}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full sm:w-auto"
          >
            {setupLoading ? (
              <svg
                className="animate-spin h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              <Code className="mr-2 h-4 w-4" />
            )}
            {setupLoading ? "Generating..." : "Generate Script Tag"}
          </button>
        ) : (
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 w-full sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Script Tag
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const NextSteps = () => {
  return (
    <div className="rounded-lg bg-white dark:bg-white/3 border border-gray-300 dark:border-gray-700 transition-colors bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Next Steps
        </h3>
        <p className="text-sm text-muted-foreground">
          Complete these steps to get the most out of FeedbackHub
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            icon={<FileCode className="h-6 w-6" />}
            title="Install Widget"
            description="Add the generated script tag to your website's HTML"
          />
          <StepCard
            icon={<Settings className="h-6 w-6" />}
            title="Customize Widget"
            description="Adjust colors, text, and questions to match your brand"
            onClick={() => console.log("Navigate to customize")}
          />
          <StepCard
            icon={<BarChart className="h-6 w-6" />}
            title="View Dashboard"
            description="Check your feedback analytics and user responses"
            onClick={() => console.log("Navigate to dashboard")}
          />
        </div>
      </div>
    </div>
  );
};

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const StepCard = ({ icon, title, description, onClick }: StepCardProps) => {
  const content = (
    <div className="flex flex-col h-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground flex-grow">{description}</p>
      {onClick && (
        <div className="flex items-center mt-3 text-sm font-medium text-primary">
          <span>Go to {title}</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {content}
      </div>
    );
  }

  return content;
};
