import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useSidebar } from "../context/SidebarContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-sidebar-text);
    font-size: 1.5rem;
    font-weight: 500;
    padding: 1.2rem 1.6rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.25s;

    /* Manual icon-only collapse only applies on desktop — tablet/mobile
       always show the full drawer with labels. */
    @media (min-width: 1024px) {
      ${(props) =>
        props.$collapsed &&
        css`
          justify-content: center;
          padding: 1.2rem;
        `}
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-sidebar-text-active);
    background-color: var(--color-sidebar-hover);
  }

  &.active:link,
  &.active:visited {
    box-shadow: inset 3px 0 0 var(--color-sidebar-accent);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-sidebar-text);
    flex-shrink: 0;
    transition: all 0.25s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-sidebar-accent);
  }
`;

const LinkLabel = styled.span`
  white-space: nowrap;
  overflow: hidden;

  /* Only ever hidden by the manual collapse toggle, and only on desktop.
     Tablet/mobile drawer always shows labels, no matter the desktop state. */
  @media (min-width: 1024px) {
    ${(props) =>
      props.$hidden &&
      css`
        display: none;
      `}
  }
`;

const links = [
  { to: "/dashboard", label: "Home", icon: <HiOutlineHome /> },
  { to: "/bookings", label: "Bookings", icon: <HiOutlineCalendarDays /> },
  { to: "/cabins", label: "Cabins", icon: <HiOutlineHomeModern /> },
  { to: "/users", label: "Users", icon: <HiOutlineUsers /> },
  { to: "/settings", label: "Settings", icon: <HiOutlineCog6Tooth /> },
];

function MainNav({ onNavigate }) {
  const { isCollapsed } = useSidebar();

  return (
    <nav>
      <NavList>
        {links.map((link) => (
          <li key={link.to}>
            <StyledNavLink
              to={link.to}
              $collapsed={isCollapsed}
              title={link.label}
              onClick={onNavigate}
            >
              {link.icon}
              <LinkLabel $hidden={isCollapsed}>{link.label}</LinkLabel>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
