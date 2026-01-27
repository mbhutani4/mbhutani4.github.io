import type { ReactElement } from "react";
import { Social } from "./Social";

export default function Header(): ReactElement {
  return (
    <header className="animate-drop-top fixed left-0 right-0 top-0 z-50 m-2 flex flex-row items-center justify-between gap-2 rounded-lg bg-(--color-background-secondary) px-6 py-4 shadow-lg shadow-black/50">
      <a
        className="text-xl font-bold uppercase tracking-widest text-text-primary"
        href="/"
      >
        Mahima Bhutani
      </a>

      <nav>
        <Social />
      </nav>
    </header>
  );
}
