// DateRangeFilter.jsx
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.6rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: 1.2rem 1.6rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-family: var(--font-operational);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const DateInput = styled.input`
  font-family: var(--font-operational);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-size: 1.4rem;
  color: var(--color-grey-800);
  height: 3.6rem;
  padding: 0 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(30, 57, 42, 0.12);
  }
`;

const Divider = styled.span`
  align-self: flex-end;
  padding-bottom: 0.9rem;
  color: var(--color-grey-400);
  font-size: 1.4rem;
`;

function DateRangeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";

  function handleStartChange(e) {
    searchParams.set("startDate", e.target.value);
    setSearchParams(searchParams);
  }

  function handleEndChange(e) {
    searchParams.set("endDate", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      <Field>
        <Label htmlFor="startDate">From</Label>
        <DateInput
          id="startDate"
          type="date"
          value={startDate}
          onChange={handleStartChange}
          max={endDate || undefined}
        />
      </Field>

      <Divider>—</Divider>

      <Field>
        <Label htmlFor="endDate">To</Label>
        <DateInput
          id="endDate"
          type="date"
          value={endDate}
          onChange={handleEndChange}
          min={startDate || undefined}
        />
      </Field>
    </StyledFilter>
  );
}

export default DateRangeFilter;
