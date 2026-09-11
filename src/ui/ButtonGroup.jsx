import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    justify-content: stretch;

    & > * {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default ButtonGroup;
