"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectProtectedBanner({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`/api/validate-project-password?projectId=${projectId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-blue-500/10 border-b border-blue-500/20 px-6 py-3 flex items-center justify-between gap-4">
      <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
        🔒 This is a password-protected project - you are viewing with
        authentication
      </p>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
