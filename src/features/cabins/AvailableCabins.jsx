import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import DateRangeFilter from "../../ui/DateRangeFilter";
import { useAvailableCabins } from "../cabins/useAvailableCabins";
import AvailableCabinsTable from "../cabins/AvailableCabinsTable";

const StyledAvailableCabins = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

function AvailableCabins() {
  const { availableCabins, isFetching, checkAvailability } =
    useAvailableCabins();

  return (
    <StyledAvailableCabins>
      <Heading as="h3">Create new booking</Heading>

      <SearchRow>
        <DateRangeFilter />
        <Button onClick={checkAvailability} disabled={isFetching}>
          {isFetching ? "Checking…" : "Check availability"}
        </Button>
      </SearchRow>

      {availableCabins && (
        <AvailableCabinsTable
          cabins={availableCabins}
          isFetching={isFetching}
        />
      )}
    </StyledAvailableCabins>
  );
}

export default AvailableCabins;
