import styled from "styled-components";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiXMark,
} from "react-icons/hi2";

import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import SidebarAccount from "../features/authentication/SidebarAccount";
import { useSidebar } from "../context/SidebarContext";

const StyledSidebar = styled.aside`
  background-color: var(--color-sidebar-bg);
  padding: 2.4rem ${(props) => (props.$isCollapsed ? "1.2rem" : "2.4rem")};
  border-right: 1px solid var(--color-sidebar-border);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  height: 100%;
  transition: padding 0.25s ease;

  /* Tablet + Mobile: off-canvas drawer that slides in over the content,
     from the right — opened via the header's hamburger button. */
  @media (max-width: 1023px) {
    position: fixed;
    inset: 0 0 0 auto;
    width: 28rem;
    max-width: 80vw;
    height: 100vh;
    padding: 2.4rem;
    z-index: 200;
    border-right: none;
    border-left: 1px solid var(--color-sidebar-border);
    transform: translateX(
      ${(props) => (props.$isMobileMenuOpen ? "0" : "100%")}
    );
    transition: transform 0.25s ease;
    box-shadow: var(--shadow-lg);
  }
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: ${(props) => (props.$isMobileMenuOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background-color: var(--backdrop-color);
    z-index: 150;
  }
`;

const ToggleButton = styled.button`
  align-self: ${(props) => (props.$isCollapsed ? "center" : "flex-end")};
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-sidebar-text);
  transition: all 0.2s;

  /* Desktop-only manual collapse toggle — tablet/mobile use the drawer */
  @media (max-width: 1023px) {
    display: none;
  }

  &:hover {
    background-color: var(--color-sidebar-hover);
    color: var(--color-sidebar-text-active);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    display: block;
  }
`;

const MobileCloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  align-self: flex-start;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-sidebar-text);

  &:hover {
    background-color: var(--color-sidebar-hover);
    color: var(--color-sidebar-text-active);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    display: block;
  }

  @media (max-width: 1023px) {
    display: block;
  }
`;

function Sidebar() {
  const { isCollapsed, toggleSidebar, isMobileMenuOpen, closeMobileMenu } =
    useSidebar();

  return (
    <>
      <Backdrop
        $isMobileMenuOpen={isMobileMenuOpen}
        onClick={closeMobileMenu}
      />

      <StyledSidebar
        $isCollapsed={isCollapsed}
        $isMobileMenuOpen={isMobileMenuOpen}
      >
        <MobileCloseButton onClick={closeMobileMenu} title="Close menu">
          <HiXMark />
        </MobileCloseButton>

        <ToggleButton
          onClick={toggleSidebar}
          $isCollapsed={isCollapsed}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <HiOutlineChevronDoubleRight />
          ) : (
            <HiOutlineChevronDoubleLeft />
          )}
        </ToggleButton>

        <Logo collapsed={isCollapsed} />
        <MainNav onNavigate={closeMobileMenu} />

        {/* {!isCollapsed && <Uploader />} */}

        <SidebarAccount collapsed={isCollapsed} onNavigate={closeMobileMenu} />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
