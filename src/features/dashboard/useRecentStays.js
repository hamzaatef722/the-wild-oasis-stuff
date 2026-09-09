import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoadingStays, data: recentStays } = useQuery({
    queryKey: ["stays", `last=${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  return { isLoadingStays, recentStays };
}
