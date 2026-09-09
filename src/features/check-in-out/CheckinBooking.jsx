import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../bookings/BookingDataBox";

import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";

import styled from "styled-components";
import Empty from "../../ui/Empty";
import { useSettings } from "../settings/useSettings";
// import { box } from "styles/styles";
// import { useSettings } from "features/settings/useSettings";

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isLoading, booking } = useBooking();
  const { isLoading: isLoadingSetting, settings } = useSettings();
  console.log(settings);

  const { isCkeckingIn, checkin } = useCheckin();

  const moveBack = useMoveBack();
  useEffect(() => {
    if (booking) setConfirmedPaid(booking?.isPaid);
  }, [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;
  if (!booking) return <Empty source="booking" />;

  const {
    id: bookingId,
    totalPrice,
    guests,
    hasBreakfast,
    numGuests,
    numNights,
  } = booking;

  const totalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;
  // Can't use as initial state, because booking will still be loading

  function handleCheckin() {
    if (!confirmedPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalBreakfastPrice,
          totalPrice: totalPrice + totalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* LATER */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmedPaid(false);
            }}
          >
            add optional breakfast {formatCurrency(settings.breakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirmed) => !confirmed)}
          disabled={confirmedPaid || isCkeckingIn}
          id="confirm"
        >
          confirm all that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + totalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(totalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmedPaid || isCkeckingIn}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
