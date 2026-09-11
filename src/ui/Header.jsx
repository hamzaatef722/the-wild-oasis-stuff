import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";

import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import { useSidebar } from "../context/SidebarContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1023px) {
    padding: 1.2rem 2.4rem;
    justify-content: space-between;
  }

  @media (max-width: 767px) {
    padding: 1.2rem 1.6rem;
  }
`;

const MobileLogoWrapper = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: block;

    img {
      height: 3.6rem;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    display: block;
  }

  @media (max-width: 1023px) {
    display: block;
  }
`;

function Header() {
  const { toggleMobileMenu } = useSidebar();

  return (
    <StyledHeader>
      <MobileLogoWrapper>
        <Logo />
      </MobileLogoWrapper>

      <HeaderMenu />

      <MenuButton onClick={toggleMobileMenu} title="Menu">
        <HiBars3 />
      </MenuButton>
    </StyledHeader>
  );
}

export default Header;
