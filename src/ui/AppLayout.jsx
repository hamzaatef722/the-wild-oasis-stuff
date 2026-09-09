import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useSidebar } from "../context/SidebarContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$isCollapsed ? "8.8rem" : "26rem")} 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  transition: grid-template-columns 0.25s ease;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <StyledAppLayout $isCollapsed={isCollapsed}>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
