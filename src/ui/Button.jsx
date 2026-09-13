import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.1rem;
    padding: 0.6rem 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1rem 2rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: #78350f;
    background: var(--color-grey-100);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: #eae2d5;
      color: #b45309;
    }
  `,
  ghost: css`
    color: var(--color-grey-600);
    background: transparent;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-grey-100);
      color: var(--color-grey-800);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.15s;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}

  &:hover {
    transform: translateY(-0.5px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
