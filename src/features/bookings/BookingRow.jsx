import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiPencil,
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

// Card-mode row: on mobile a booking becomes a compact card instead of a
// horizontally-scrolling table row.
const StyledBookingRow = styled(Table.Row)`
  @media (max-width: 767px) {
    grid-template-areas:
      "cabin tag"
      "guest guest"
      "dates dates"
      "amount actions";
    grid-template-columns: 1fr auto;
    row-gap: 0.6rem;
    column-gap: 1.2rem;
    padding: 1.6rem;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: 767px) {
    grid-area: cabin;
    color: var(--color-grey-800);
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  &:nth-of-type(1) {
    @media (max-width: 767px) {
      grid-area: guest;
    }
  }

  &:nth-of-type(2) {
    @media (max-width: 767px) {
      grid-area: dates;
    }
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;

  @media (max-width: 767px) {
    grid-area: amount;
    align-self: center;
    font-size: 1.6rem;
  }
`;

const StyledTag = styled(Tag)`
  @media (max-width: 767px) {
    grid-area: tag;
    justify-self: end;
  }
`;

const Actions = styled.div`
  @media (max-width: 767px) {
    grid-area: actions;
    justify-self: end;
    align-self: center;
  }
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { isCheckingOut, checkout } = useCheckout();

  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <StyledBookingRow role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <StyledTag type={statusToTagName[status]}>
        {status.replace("-", " ")}
      </StyledTag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Actions>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                onClick={() => navigate(`/bookings/${bookingId}`)}
                icon={<HiEye />}
              >
                See details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                  icon={<HiArrowDownOnSquare />}
                >
                  Check in
                </Menus.Button>
              )}

              {status === "checked-in" && (
                <Menus.Button
                  disabled={isCheckingOut}
                  onClick={() => checkout(bookingId)}
                  icon={<HiArrowUpOnSquare />}
                >
                  Check out
                </Menus.Button>
              )}

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
              resource="booking"
            />
          </Modal.Window>
        </Modal>
      </Actions>
    </StyledBookingRow>
  );
}

export default BookingRow;
