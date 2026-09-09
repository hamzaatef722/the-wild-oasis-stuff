import { useParams } from "react-router-dom";
import { getCabin } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export function useCabin() {
  const { cabinId } = useParams();
  const { isLoading, data: cabin } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getCabin(cabinId),
  });
  return { cabin, isLoading };
}
