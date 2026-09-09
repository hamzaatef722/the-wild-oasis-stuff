import { useSettings } from "./useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdateSetting(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
          disabled={isUpdating}
          defaultValue={minBookingLength}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
