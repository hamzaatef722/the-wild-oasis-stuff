import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 1rem;
  }
`;

export default TableOperations;
