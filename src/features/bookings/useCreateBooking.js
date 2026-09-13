import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: (newBookingData) => createBookingApi(newBookingData),
    onSuccess: (data) => {
      toast.success(`New booking #${data.id} created `);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) =>
      toast.error("Booking could not be created: " + err.message),
  });
  return { createBooking, isCreating };
}
