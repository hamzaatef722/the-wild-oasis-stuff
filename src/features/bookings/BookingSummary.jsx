// BookingSummary.jsx
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { formatCurrency } from "../../utils/helpers";
import { useCreateBooking } from "./useCreateBooking";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useGuest } from "../guests/useGuest";
import { useEffect } from "react";

const StyledSummary = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
    font-weight: 600;
    font-size: 1.8rem;
  }
`;

function BookingSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { findOrCreateGuestAsync, isCheckingGuest } = useGuest();

  const { createBooking, isCreating } = useCreateBooking();

  useEffect(() => {
    if (!state?.bookingData) navigate("/bookings");
  }, [state, navigate]);

  if (!state?.bookingData) return null;

  const { bookingData, cabin, guest } = state;
  const { fullName, email, nationalID, nationality, countryFlag } = guest || {};
  const {
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    isPaid,
    observations,
  } = bookingData;

  async function handleConfirm() {
    try {
      const guest = await findOrCreateGuestAsync({
        fullName,
        email,
        nationalID,
        nationality,
        countryFlag,
      });

      createBooking(
        { ...bookingData, guestId: guest.id, cabinId: cabin.id },
        {
          onSuccess: () => {
            navigate("/bookings");
          },
        },
      );
    } catch (err) {
      toast.error(err.message);
    }
  }

  function handleEdit() {
    navigate(-1);
  }

  return (
    <StyledSummary>
      <Heading as="h2">Booking summary — Cabin {cabin.name}</Heading>

      <Row>
        <span>Dates</span>

        <span>
          {startDate?.slice(0, 10)} → {endDate?.slice(0, 10)} ({numNights}{" "}
          nights)
        </span>
      </Row>
      <Row>
        <span>Guest full name</span>
        <span>{fullName}</span>
      </Row>
      <Row>
        <span>Guest email</span>
        <span>{email}</span>
      </Row>
      <Row>
        <span>Guests</span>
        <span>{numGuests}</span>
      </Row>
      <Row>
        <span>Breakfast</span>
        <span>{hasBreakfast ? "Yes" : "No"}</span>
      </Row>
      <Row>
        <span>Cabin price</span>
        <span>{formatCurrency(cabinPrice)}</span>
      </Row>
      <Row>
        <span>Extras</span>
        <span>{formatCurrency(extrasPrice)}</span>
      </Row>
      <Row>
        <span>Paid</span>
        <span>{isPaid ? "Yes" : "No"}</span>
      </Row>
      {observations && (
        <Row>
          <span>Observations</span>
          <span>{observations}</span>
        </Row>
      )}
      <Row>
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </Row>

      <ButtonGroup>
        <Button
          variation="secondary"
          onClick={handleEdit}
          disabled={isCheckingGuest || isCreating}
        >
          Edit
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isCheckingGuest || isCreating}
        >
          {isCheckingGuest
            ? "Checking guest..."
            : isCreating
              ? "Confirming..."
              : "Confirm"}
        </Button>
      </ButtonGroup>
    </StyledSummary>
  );
}

export default BookingSummary;
