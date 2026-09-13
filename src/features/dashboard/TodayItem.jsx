import CheckoutButton from "../check-in-out/CheckoutButton";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";

// Mobile-first: a wrapping flex row that reflows onto two lines on narrow
// screens (no fixed-width columns to overflow). From tablet up it becomes
// the original single-line grid.
const StyledTodayItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.6rem;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
  }
`;

const Guest = styled.div`
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LineBreak = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    flex-basis: 100%;
    height: 0;
  }
`;

const Nights = styled.div`
  color: var(--color-grey-500);
`;

const ActionSlot = styled.div`
  @media (max-width: 767px) {
    margin-left: auto;
  }
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  const statusToAction = {
    unconfirmed: {
      action: "arriving",
      tag: "green",
      button: (
        <Button
          variation="primary"
          size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      ),
    },
    "checked-in": {
      action: "departing",
      tag: "blue",
      button: <CheckoutButton bookingId={id} />,
    },
  };

  return (
    <StyledTodayItem>
      <Tag type={statusToAction[status].tag}>
        {statusToAction[status].action}
      </Tag>
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <LineBreak />
      <Nights>{numNights} nights</Nights>

      <ActionSlot>{statusToAction[status].button}</ActionSlot>
    </StyledTodayItem>
  );
}

export default TodayItem;
