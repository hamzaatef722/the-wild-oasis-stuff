import styled from "styled-components";
import { HiPencil, HiTrash, HiSquare2Stack, HiEye } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import Table from "../../ui/Table";

import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";

// Card-mode row: on mobile each cabin becomes its own listing card
// (image on top, details below), Booking.com-style, instead of a
// horizontally-scrolling table row.
const StyledCabinRow = styled(Table.Row)`
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
  /* transform: scale(1.66666) translateX(-2px); */
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

function CabinRow({ cabin }) {
  const navigate = useNavigate();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createNewCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    discount,
    regularPrice,
    description,
    image,
  } = cabin;

  function handleDuplicate() {
    createNewCabin({
      name: `copy of ${name}`,
      maxCapacity,
      discount,
      regularPrice,
      description,
      image,
    });
  }

  return (
    <>
      <StyledCabinRow>
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
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/cabins/${cabinId}`)}
                >
                  See details
                </Menus.Button>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resource="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </Actions>
      </StyledCabinRow>
    </>
  );
}

export default CabinRow;
