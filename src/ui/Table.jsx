import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;

  /* On mobile, individual rows become their own cards (see the card-mode
     row components), so the outer table frame steps out of the way. */
  @media (max-width: 767px) {
    background-color: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
  }
`;

const CommonRow = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.4rem 2rem;

  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);

  /* Column headers don't make sense once rows become cards */
  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;

  @media (max-width: 767px) {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.4rem 2rem;
  min-height: 6.4rem;
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-hover);
  }

  /* Mobile: each row becomes its own card (Booking.com-style list item).
     Row components (CabinRow, BookingRow, ...) map their children into
     named grid areas for this layout — see each file's $mobileAreas. */
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 0;
    min-height: 0;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    column-gap: 1.2rem;
    row-gap: 0.8rem;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-200);
    }

    &:hover {
      background-color: var(--color-grey-0);
    }
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }

  @media (max-width: 767px) {
    background-color: transparent;
    padding: 0.8rem 0 0;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: var(--color-grey-600);
`;

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
};
Table.Row = function Row({ children, className }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns} className={className}>
      {children}
    </StyledRow>
  );
};
Table.Body = function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at this moment </Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Footer = Footer;

export default Table;
