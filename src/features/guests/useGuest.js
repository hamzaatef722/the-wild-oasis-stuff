// features/guests/useGuest.js
import { useMutation } from "@tanstack/react-query";
import { findOrCreateGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useGuest() {
  const { mutateAsync: findOrCreateGuestAsync, isLoading: isCheckingGuest } =
    useMutation({
      mutationFn: ({ email, nationalID, fullName, nationality, countryFlag }) =>
        findOrCreateGuest({
          email,
          nationalID,
          fullName,
          nationality,
          countryFlag,
        }),
      onError: (err) =>
        toast.error("Guest could not be found or created: " + err.message),
    });

  return { findOrCreateGuestAsync, isCheckingGuest };
}
