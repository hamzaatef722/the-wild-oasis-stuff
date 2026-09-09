// AvailableCabinRow.jsx
import styled from "styled-components";
import { HiCheckCircle } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
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
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? (
          formatCurrency(discount)
        ) : (
          <span className="text-center">&mdash;</span>
        )}
      </Discount>
      <div className="flex items-center gap-1">
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
      </div>
    </Table.Row>
  );
}

export default AvailableCabinRow;
