// CabinDetails.jsx
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import { useCabin } from "./useCabin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

const StyledCabinDetails = styled.div`
  display: flex;
  gap: 2.4rem;
  padding: 2.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

const Img = styled.img`
  width: 24rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Name = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  font-family: "Sono";
  color: var(--color-grey-700);
`;

const Capacity = styled.p`
  color: var(--color-grey-500);
`;

const Price = styled.p`
  font-family: "Sono";
  font-weight: 600;
  font-size: 1.8rem;
`;

const Discount = styled.span`
  color: var(--color-green-700);
  font-weight: 500;
  margin-left: 0.8rem;
`;

const Description = styled.p`
  color: var(--color-grey-600);
  line-height: 1.6;
`;

function CabinDetails() {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const hasSearchParams = startDate && endDate;
  const { cabin, isLoading } = useCabin();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!cabin) return null;

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  return (
    <>
      <StyledCabinDetails>
        <Img src={image} alt={`Cabin ${name}`} />

        <Info>
          <Name>Cabin {name}</Name>
          <Capacity>Fits up to {maxCapacity} guests</Capacity>

          <Price>
            {formatCurrency(regularPrice)}
            {discount > 0 && <Discount>-{formatCurrency(discount)}</Discount>}
          </Price>

          <Description>{description}</Description>
        </Info>
      </StyledCabinDetails>
      <ButtonGroup>
        <Button onClick={moveBack} variation="secondary">
          Back
        </Button>
        {hasSearchParams && (
          <Button
            onClick={() =>
              navigate(
                `/bookings/book-cabins/${cabinId}?startDate=${startDate}&endDate=${endDate}`,
              )
            }
          >
            Book now
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default CabinDetails;
