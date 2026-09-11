import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto 34rem auto;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto) 28rem auto;
  }
`;

function DashboardLayout() {
  const { isLoadingRecentBookings, recentBookings, numDays } =
    useRecentBookings();
  const { isLoadingStays, recentStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        recentStays={recentStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart recentStays={recentStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
