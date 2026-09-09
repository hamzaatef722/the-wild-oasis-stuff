import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-family: var(--font-editorial);
  color: var(--color-grey-800);

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 2.75rem;
      font-weight: 500;
      letter-spacing: -0.015em;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      letter-spacing: -0.01em;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.6rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-family: var(--font-operational);
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
    `}

  line-height: 1.3;
`;

export default Heading;
