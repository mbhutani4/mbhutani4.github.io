"use client";

import { IconButton } from "components/Button";
import IconDown from "icons/Down";
import type { ReactElement } from "react";

export function ScrollToTopButton(): ReactElement {
  return (
    <IconButton
      className="fixed bottom-4 right-4 h-auto w-auto rounded-full bg-(--color-background-secondary) p-2 text-text-primary shadow-md [&>svg]:h-4 [&>svg]:w-4 [&>svg]:rotate-180 [&>svg]:fill-current"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      title={"Scroll to top"}
    >
      <IconDown />
    </IconButton>
  );
}
