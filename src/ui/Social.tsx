import styled from "@emotion/styled";
import IconLinkedIn from "icons/LinkedIn";
import IconMail from "icons/Mail";
import IconResume from "icons/Resume";
import Link, { LinkProps } from "next/link";
import { Color } from "styles";

export function Social(): React.ReactNode {
  return (
    <NavBarList>
      <NavItemWithLink href="/MahimaBhutani_Resume.pdf">
        <IconResume />
        <span className="linkText">Resume</span>
      </NavItemWithLink>
      <NavItemWithLink href="https://www.linkedin.com/in/mahimabhutani/">
        <IconLinkedIn />
        <span className="linkText">LinkedIn</span>
      </NavItemWithLink>
      <NavItemWithLink href="mailto:mahima@bhutani.design">
        <IconMail />
        <span className="linkText">Mail</span>
      </NavItemWithLink>
    </NavBarList>
  );
}

function NavItemWithLink({
  children,
  ...linkProps
}: React.PropsWithChildren<LinkProps>): React.ReactElement {
  return (
    <NavBarItem>
      <Link {...linkProps}>{children}</Link>
    </NavBarItem>
  );
}

const NavBarList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  font-size: 0.9rem;
  margin: 0;
`;

const NavBarItem = styled.li`
  margin: 0 0 0 1em;

  &,
  a {
    color: ${Color.Text_Secondary};
    fill: ${Color.Text_Secondary};
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &:hover,
  a:hover {
    color: ${Color.Text_Primary};
    fill: ${Color.Text_Primary};
  }

  svg {
    width: 1em;
    height: 1em;
    margin: 0 0.5em;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
