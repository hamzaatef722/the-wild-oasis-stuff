import styled from "styled-components";

export const Textarea = styled.textarea`
  padding: 1rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;

  &::placeholder {
    color: var(--color-grey-400);
  }
`;
