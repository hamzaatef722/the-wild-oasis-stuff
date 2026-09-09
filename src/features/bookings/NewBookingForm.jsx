// NewBookingForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";

import { useCabin } from "../cabins/useCabin";
import { useSettings } from "../settings/useSettings";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import { Textarea } from "../../ui/Textarea";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

function NewBookingForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cabinId = searchParams.get("cabinId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const { cabin, isLoading: isLoadingCabin } = useCabin(cabinId);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { isPaid: false },
  });
  const { errors } = formState;

  if (isLoadingCabin || isLoadingSettings) return <Spinner />;
  if (!cabin || !settings) return null;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const numNights = differenceInDays(parseISO(endDate), parseISO(startDate));
  const maxGuestsAllowed = Math.min(cabin.maxCapacity, maxGuestsPerBooking);
  const isBookingLengthValid =
    numNights >= minBookingLength && numNights <= maxBookingLength;
  const isGuestsValid = numGuests >= 1 && numGuests <= maxGuestsAllowed;

  const cabinPrice = numNights * cabin.regularPrice - (cabin.discount || 0);
  const extrasPrice = hasBreakfast ? numNights * numGuests * breakfastPrice : 0;
  const totalPrice = cabinPrice + extrasPrice;

  function handleNumGuestsChange(e) {
    const value = Number(e.target.value);
    setNumGuests(Number.isNaN(value) ? 0 : value);
  }

  async function onSubmit(data) {
    if (!isBookingLengthValid || !isGuestsValid) return;

    const guest = {
      fullName: data.fullName,
      email: data.email,
      nationalID: data.nationalID,
      nationality: data.nationality,
      countryFlag: "",
    };

    const bookingData = {
      guestId: guest.id,
      cabinId: Number(cabinId),
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice,
      extrasPrice,
      totalPrice,
      hasBreakfast,
      isPaid: data.isPaid,
      observations: data.observations,
      status: "checked-in",
    };

    navigate("/bookings/summary", { state: { bookingData, cabin, guest } });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isBookingLengthValid && (
        <FormRow>
          <p style={{ color: "var(--color-red-700)" }}>
            Booking length must be between {minBookingLength} and{" "}
            {maxBookingLength} nights. This selection has {numNights} nights —
            please go back and pick different dates.
          </p>
        </FormRow>
      )}

      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Nationality">
        <Input type="text" id="nationality" {...register("nationality")} />
      </FormRow>

      <FormRow
        label="Number of guests"
        error={!isGuestsValid ? `Max ${maxGuestsAllowed} guests` : ""}
      >
        <Input
          type="number"
          id="numGuests"
          min={1}
          max={maxGuestsAllowed}
          value={numGuests}
          onChange={handleNumGuestsChange}
        />
      </FormRow>

      <FormRow label="Want breakfast?">
        <Checkbox
          id="hasBreakfast"
          checked={hasBreakfast}
          onChange={(e) => setHasBreakfast(e.target.checked)}
        >
          Yes, add breakfast ({breakfastPrice} / guest / night)
        </Checkbox>
      </FormRow>

      <FormRow label="Already paid?">
        <Checkbox id="isPaid" {...register("isPaid")}>
          Yes, already paid
        </Checkbox>
      </FormRow>

      <FormRow label="Observations">
        <Textarea id="observations" {...register("observations")} />
      </FormRow>

      <FormRow>
        <p>
          {numNights} nights · Cabin: {cabinPrice} · Extras: {extrasPrice} ·{" "}
          <strong>Total: {totalPrice}</strong>
        </p>
      </FormRow>

      <FormRow>
        <Button
          type="submit"
          disabled={!isBookingLengthValid || !isGuestsValid}
        >
          Check in
        </Button>
      </FormRow>
    </form>
  );
}

export default NewBookingForm;
