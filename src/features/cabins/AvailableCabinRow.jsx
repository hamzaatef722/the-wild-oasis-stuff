// AvailableCabinRow.jsx
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

// Card-mode row: mirrors CabinRow's mobile card, with a "Select" button
// standing in for the actions menu (Booking.com "Select room" pattern).
const StyledAvailableCabinRow = styled(Table.Row)`
  @media (max-width: 767px) {
    grid-template-areas:
      "img img"
      "name actions"
      "capacity capacity"
      "price discount";
    row-gap: 0;
    column-gap: 0;
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 767px) {
    grid-area: img;
    width: 100%;
    aspect-ratio: 16 / 9;
    transform: none;
    border-radius: 0;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: 767px) {
    grid-area: name;
    font-size: 1.8rem;
    color: var(--color-grey-800);
    padding: 1.6rem 0 0 1.6rem;
  }
`;

const Capacity = styled.div`
  @media (max-width: 767px) {
    grid-area: capacity;
    padding: 0 1.6rem;
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  @media (max-width: 767px) {
    grid-area: price;
    padding: 0 0 1.6rem 1.6rem;
    font-size: 1.6rem;
  }
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);

  @media (max-width: 767px) {
    grid-area: discount;
    padding: 0 1.6rem 1.6rem 0;
    text-align: right;
  }
`;

const Actions = styled.div`
  @media (max-width: 767px) {
    grid-area: actions;
    padding: 1.6rem 1.6rem 0 0;
    justify-self: end;
  }
`;

function AvailableCabinRow({ cabin }) {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const navigate = useNavigate();
  const {
    id: cabinId,
    name,
    maxCapacity,
    discount,
    regularPrice,
    image,
  } = cabin;

  return (
    <StyledAvailableCabinRow>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <Capacity>Fits up to {maxCapacity} guests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? (
          formatCurrency(discount)
        ) : (
          <span className="text-center">&mdash;</span>
        )}
      </Discount>
      <Actions>
        <Button
          onClick={() =>
            navigate(
              `/cabins/${cabinId}/?startDate=${startDate}&endDate=${endDate}`,
            )
          }
          size="small"
          variation="secondary"
        >
          Select
        </Button>
      </Actions>
    </StyledAvailableCabinRow>
  );
}

export default AvailableCabinRow;
