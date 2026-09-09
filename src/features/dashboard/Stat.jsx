import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);

  padding: 2rem 2.4rem;
  display: grid;
  grid-template-columns: 4.8rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-grey-100);

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-family: var(--font-operational);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-family: var(--font-operational);
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-grey-800);
  font-feature-settings: "tnum" 1, "lnum" 1;
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
