import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

import { useUser } from "./useUser";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Wrapper = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid var(--color-sidebar-border);

  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${(props) =>
    props.$collapsed &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

const AccountLink = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
  min-width: 0;
  padding: 0;
  color: var(--color-sidebar-text);
  transition: color 0.2s;

  &:hover {
    color: var(--color-sidebar-text-active);
  }

  ${(props) =>
    props.$collapsed &&
    css`
      flex: initial;
      justify-content: center;
    `}
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  height: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
`;

const Name = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-sidebar-text);
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sidebar-hover);
    color: var(--color-sidebar-text-active);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    display: block;
  }
`;

function SidebarAccount({ collapsed = false }) {
  const { user } = useUser();
  const { isLoading, logout } = useLogout();
  const navigate = useNavigate();

  const { avatar, fullName } = user.user_metadata;

  return (
    <Wrapper $collapsed={collapsed}>
      <AccountLink
        $collapsed={collapsed}
        onClick={() => navigate("/account")}
        title="Account"
      >
        <Avatar src={avatar || "default-user.jpg"} alt={`avatar of ${fullName}`} />
        {!collapsed && <Name>{fullName}</Name>}
      </AccountLink>

      {!collapsed && (
        <LogoutButton disabled={isLoading} onClick={logout} title="Logout">
          {!isLoading ? <CiLogin /> : <SpinnerMini />}
        </LogoutButton>
      )}
    </Wrapper>
  );
}

export default SidebarAccount;
