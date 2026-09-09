import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useActivityToday() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["activity-today"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, activities };
}
