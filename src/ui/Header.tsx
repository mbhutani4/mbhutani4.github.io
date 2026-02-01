import type { ReactElement } from "react";
import { Social } from "./Social";

export default function Header(): ReactElement {
  return (
    <header className="animate-drop-top fixed left-0 right-0 top-0 z-50 m-2 flex flex-row items-center justify-between gap-2 rounded-lg bg-(--color-background-secondary) px-6 py-4 shadow-lg shadow-black/20 backdrop-blur-sm">
      <a
        className="text-lg md:text-xl font-bold uppercase tracking-widest text-text-primary hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-1"
        href="/"
        aria-label="Mahima Bhutani - Home"
      >
        Mahima Bhutani
      </a>

      <nav aria-label="Social links">
        <Social />
      </nav>
    </header>
  );
}
