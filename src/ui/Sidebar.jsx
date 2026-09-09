import styled from "styled-components";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
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
`;

const ToggleButton = styled.button`
  align-self: ${(props) => (props.$isCollapsed ? "center" : "flex-end")};
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-sidebar-text);
  transition: all 0.2s;

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

function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <StyledSidebar $isCollapsed={isCollapsed}>
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
      <MainNav />

      {/* {!isCollapsed && <Uploader />} */}

      <SidebarAccount collapsed={isCollapsed} />
    </StyledSidebar>
  );
}

export default Sidebar;
