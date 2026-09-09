// useAvailableCabins.js
import { useQuery } from "@tanstack/react-query";
import { getAvailableCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { isBefore, isAfter, parseISO, startOfToday } from "date-fns";
import toast from "react-hot-toast";

export function useAvailableCabins() {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const {
    data: availableCabins,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["availableCabins", startDate, endDate],
    queryFn: () => getAvailableCabins(startDate, endDate),
    enabled: false,
  });

  function checkAvailability() {
    const validationError = getValidationError(startDate, endDate);
    if (validationError) {
      //   toast.error(validationError);
      return;
    }
    refetch();
  }

  return { availableCabins, isFetching, checkAvailability };
}

function getValidationError(startDate, endDate) {
  if (!startDate || !endDate)
    return toast.error("Please select both start and end dates");

  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const today = startOfToday();

  if (isBefore(start, today))
    return toast.error("Start date cannot be before today");
  if (isAfter(start, end))
    return toast.error("Start date cannot be after end date");

  return null;
}
