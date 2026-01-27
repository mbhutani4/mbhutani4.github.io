import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import IconLinkedIn from "icons/LinkedIn";
import IconMail from "icons/Mail";
import IconResume from "icons/Resume";
import Link, { LinkProps } from "next/link";

export function Social(): ReactNode {
  return (
    <ul className="flex list-none items-center gap-4 text-sm md:text-base">
      <NavItemWithLink href="/MahimaBhutani_Resume.pdf">
        <div className="h-4 w-4 fill-current flex items-center justify-center">
          <IconResume />
        </div>
        <span className="linkText max-[550px]:hidden">Resume</span>
      </NavItemWithLink>
      <NavItemWithLink href="https://www.linkedin.com/in/mahimabhutani/">
        <div className="h-4 w-4 fill-current flex items-center justify-center">
          <IconLinkedIn />
        </div>
        <span className="linkText max-[550px]:hidden">LinkedIn</span>
      </NavItemWithLink>
      <NavItemWithLink href="mailto:mahima@bhutani.design">
        <div className="h-4 w-4 fill-current flex items-center justify-center">
          <IconMail />
        </div>
        <span className="linkText max-[550px]:hidden">Mail</span>
      </NavItemWithLink>
    </ul>
  );
}

function NavItemWithLink({
  children,
  ...linkProps
}: PropsWithChildren<LinkProps>): ReactElement {
  return (
    <li>
      <Link
        {...linkProps}
        className="flex items-center justify-start gap-2 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] [&>svg]:transition-transform [&>svg]:hover:scale-110"
      >
        {children}
      </Link>
    </li>
  );
}
