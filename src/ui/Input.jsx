import styled from "styled-components";

const Input = styled.input`
  height: 4.2rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0 1.2rem;
  color: var(--color-grey-800);
  box-shadow: var(--shadow-sm);

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default Input;
