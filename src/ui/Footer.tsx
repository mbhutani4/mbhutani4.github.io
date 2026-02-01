import { Social } from "./Social";
import { ScrollToTopButton } from "./ScrollToTopButton";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer className="mx-auto max-w-4xl border-t border-(--color-border) px-5 py-8 text-center">
      <div className="flex flex-col items-center justify-center gap-4 text-sm md:text-base">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">
            © 2018-{new Date().getFullYear()} Mahima Bhutani
          </span>
          <Social />
        </div>
        <p className="text-xs text-text-disabled">
          Designed and built with care for accessibility and user experience
        </p>
      </div>
      <ScrollToTopButton />
    </footer>
  );
}
