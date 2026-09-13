import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  height: 4.2rem;
  padding: 0 1rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-200)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  font-weight: 400;
  box-shadow: var(--shadow-sm);

  @media (max-width: 767px) {
    width: 100%;
  }
`;

function Select({ options, type, onChange, value }) {
  return (
    <StyledSelect onChange={onChange} type={type} value={value}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
