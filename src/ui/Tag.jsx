import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-full);

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    flex-shrink: 0;
  }
`;

export default Tag;
