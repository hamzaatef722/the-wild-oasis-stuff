import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import styled from "styled-components";

import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authentication user
  const { isLoading, isAuthenticated } = useUser();

  //   2. if no authentication redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  //   3.while loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />{" "}
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
