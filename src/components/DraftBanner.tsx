"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DraftBanner({ isVisible }: { isVisible: boolean }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isPasswordAuthenticated = !isVisible;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/validate-draft-password", { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-3 flex items-center justify-between gap-4">
      <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
        📝 This is a draft project{" "}
        {isVisible
          ? "and visible in development mode"
          : "- you are viewing with password authentication"}
      </p>
      {isPasswordAuthenticated && (
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-xs px-3 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      )}
    </div>
  );
}
