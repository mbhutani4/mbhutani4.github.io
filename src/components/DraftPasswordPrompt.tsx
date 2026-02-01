"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "./Section";
import { Paragraph } from "./Text";

export function DraftPasswordPrompt({ projectId }: { projectId: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Call server API to validate password (never exposed to client)
      const response = await fetch("/api/validate-draft-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, projectId }),
      });

      const data = await response.json();

      if (data.valid) {
        // Password is correct, refresh page to load with auth cookie
        router.refresh();
      } else {
        setError(data.error || "Incorrect password");
        setPassword("");
      }
    } catch (err) {
      setError("Failed to verify password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HeroSection className="flex flex-col items-center justify-center min-h-[50vh] gap-8 px-6 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Draft Project</h1>
          <Paragraph className="text-text-secondary">
            This project is still in draft. Please enter the password to view
            it.
          </Paragraph>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isSubmitting}
              autoFocus
              className="w-full px-4 py-2 border border-text-secondary/30 rounded-lg bg-background-primary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-text-primary/20 disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className="w-full px-4 py-2 bg-text-primary text-background-primary rounded-lg font-medium hover:bg-text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Verifying..." : "View Project"}
          </button>
        </form>

        <p className="text-xs text-text-secondary text-center">
          This is a password-protected draft project.
        </p>
      </div>
    </HeroSection>
  );
}
