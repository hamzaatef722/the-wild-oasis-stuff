import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-full);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-grey-600);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-grey-0);
      color: var(--color-grey-800);
      box-shadow: var(--shadow-sm);
    `}

  border-radius: var(--border-radius-full);
  font-weight: 500;
  font-size: 1.3rem;
  /* To give the same height as select */
  padding: 0.6rem 1.2rem;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: var(--color-grey-800);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
