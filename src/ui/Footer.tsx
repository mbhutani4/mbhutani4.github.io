import { Social } from "./Social";
import { ScrollToTopButton } from "./ScrollToTopButton";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer className="w-full border-t border-(--color-border) px-5 py-12 text-center bg-gradient-to-t from-background-secondary to-background-primary">
      <div className="mx-auto max-w-4xl flex flex-col items-center justify-center gap-6 text-sm md:text-base">
        <div className="flex items-center justify-center gap-4 flex-col md:flex-row">
          <span className="text-sm font-light">
            © 2018-{new Date().getFullYear()} Mahima Bhutani
          </span>
          <div className="h-5 w-px bg-accent/30 hidden md:block"></div>
          <Social />
        </div>
        <p className="text-xs text-text-disabled max-w-sm font-light">
          Crafted with care for accessibility, performance, and user experience
        </p>
      </div>
      <ScrollToTopButton />
    </footer>
  );
}
