"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Section } from "components/Section";
import { Heading, Paragraph } from "components/Text";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Project error:", error);
  }, [error]);

  const isNotFound = error.message.includes("not found");

  return (
    <Section className="min-h-screen bg-gradient-to-b from-background-primary to-background-secondary py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-accent mb-4">
            {isNotFound ? "404" : "⚠️"}
          </div>
          <Heading as="h1" className="text-4xl mb-4">
            {isNotFound ? "Project Not Found" : "Oops! Something Went Wrong"}
          </Heading>
        </div>

        <Paragraph className="text-lg mb-8 text-text-secondary max-w-lg mx-auto">
          {isNotFound
            ? "The project you're looking for doesn't exist. It may have been moved or deleted."
            : "We encountered an error while loading this project. Please try again or go back to the portfolio."}
        </Paragraph>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Back to Portfolio
          </Link>

          {!isNotFound && (
            <button
              onClick={reset}
              className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>

        {error.digest && (
          <p className="text-xs text-text-secondary mt-8 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </Section>
  );
}
