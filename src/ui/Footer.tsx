import { Social } from "./Social";
import { ScrollToTopButton } from "./ScrollToTopButton";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer className="mx-auto max-w-4xl border-t border-(--color-border) px-5 py-5 text-center">
      <div className="flex items-center justify-center gap-2 text-sm md:text-base">
        <span className="text-sm">
          © 2018-{new Date().getFullYear()} Mahima Bhutani
        </span>
        <Social />
      </div>
      <ScrollToTopButton />
    </footer>
  );
}
