"use client";

import { IconButton } from "components/Button";
import IconDown from "icons/Down";
import { Social } from "./Social";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer className="mx-auto max-w-4xl border-t border-[var(--color-border)] px-5 py-5 text-center">
      <div className="flex items-center justify-center gap-2 text-sm md:text-base">
        <span className="text-sm">
          © 2018-{new Date().getFullYear()} Mahima Bhutani
        </span>
        <Social />
      </div>
      <IconButton
        className="fixed bottom-4 right-4 h-auto w-auto rounded-full bg-[var(--color-background-secondary)] p-2 text-[var(--color-text-primary)] shadow-md [&>svg]:h-4 [&>svg]:w-4 [&>svg]:rotate-180 [&>svg]:fill-current"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
        title={"Scroll to top"}
      >
        <IconDown />
      </IconButton>
    </footer>
  );
}
