import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

&.light-mode{

  /* ============ Alpine Nordic Sanctuary — Light ============ */

  /* Mineral / Pine neutrals */
  --color-grey-0: #ffffff;      /* card & sheet elevation */
  --color-grey-50: #fbf9f5;     /* canvas / app surface */
  --color-grey-100: #f4efe6;    /* muted container / table head / chip bg */
  --color-grey-200: #e6dfd5;    /* hairline framing */
  --color-grey-300: #d8cfc2;    /* reinforced border (popovers/datepickers) */
  --color-grey-400: #9ba6a0;    /* placeholder / disabled */
  --color-grey-500: #7c8880;    /* muted icon */
  --color-grey-600: #5c6b64;    /* secondary / muted copy */
  --color-grey-700: #3a423d;    /* body text */
  --color-grey-800: #1c2421;    /* headings / dark pine charcoal */
  --color-grey-900: #14261c;    /* max contrast */

  /* Status tokens */
  --color-blue-100: #fef3c7;    /* Unconfirmed / Pending */
  --color-blue-700: #92400e;
  --color-yellow-100: #fef3c7;  /* Not paid / Pending */
  --color-yellow-700: #92400e;
  --color-green-100: #d1fae5;   /* Checked-in / Paid */
  --color-green-700: #065f46;
  --color-silver-100: #e2e8f0; /* Checked-out / Closed */
  --color-silver-700: #475569;
  --color-indigo-100: #ecfdf5; /* Settled / Paid */
  --color-indigo-700: #047857;

  --color-red-100: #fee2e2;    /* Folio due / Overdue */
  --color-red-700: #991b1b;
  --color-red-800: #7f1d1d;

  /* Brand — Primary Spruce */
  --color-brand-50: #ffffff;
  --color-brand-100: #e3eae6;
  --color-brand-200: #c7d6cc;
  --color-brand-500: #1e392a;
  --color-brand-600: #1e392a;
  --color-brand-700: #14261c;
  --color-brand-800: #102015;
  --color-brand-900: #0b160f;

  --backdrop-color: rgba(20, 38, 28, 0.45);

  --shadow-sm: 0 1px 3px rgba(28, 36, 33, 0.04), 0 6px 16px -4px rgba(28, 36, 33, 0.02);
  --shadow-md: 0 10px 25px -5px rgba(20, 38, 28, 0.08), 0 8px 10px -6px rgba(20, 38, 28, 0.04);
  --shadow-lg: 0 25px 50px -12px rgba(20, 38, 28, 0.18);

  --image-grayscale: 0;
  --image-opacity: 100%;

  /* Fixed shell identity — sidebar stays timber-spruce in both modes */
  --color-sidebar-bg: #1e392a;
  --color-sidebar-border: #14261c;
  --color-sidebar-hover: rgba(255, 255, 255, 0.08);
  --color-sidebar-text: rgba(255, 255, 255, 0.65);
  --color-sidebar-text-active: #ffffff;
  --color-sidebar-accent: #d97706;

  --color-grey-hover: #faf7f2;
}

  &.dark-mode{

  /* ============ Alpine Nordic Sanctuary — Dark ============ */

  --color-grey-0: #16211a;
  --color-grey-50: #0f1811;
  --color-grey-100: #1e2b22;
  --color-grey-200: #2c3a30;
  --color-grey-300: #3a4a3e;
  --color-grey-400: #6b7d70;
  --color-grey-500: #8fa096;
  --color-grey-600: #afc2b5;
  --color-grey-700: #d3e0d8;
  --color-grey-800: #eff5f1;
  --color-grey-900: #ffffff;

  --color-blue-100: #4a2e00;
  --color-blue-700: #fcd34d;
  --color-yellow-100: #4a2e00;
  --color-yellow-700: #fcd34d;
  --color-green-100: #063d2c;
  --color-green-700: #6ee7b7;
  --color-silver-100: #263449;
  --color-silver-700: #cbd5e1;
  --color-indigo-100: #06342a;
  --color-indigo-700: #6ee7b7;

  --color-red-100: #4c0d0d;
  --color-red-700: #fca5a5;
  --color-red-800: #fecaca;

  --color-brand-50: #052013;
  --color-brand-100: #1e392a;
  --color-brand-200: #314d3c;
  --color-brand-500: #afceb9;
  --color-brand-600: #afceb9;
  --color-brand-700: #85a38f;
  --color-brand-800: #cbead4;
  --color-brand-900: #e6f4ea;

    --backdrop-color: rgba(0, 0, 0, 0.6);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 25px 50px -12px rgba(0, 0, 0, 0.6);

    --image-grayscale: 10%;
    --image-opacity: 90%;

    /* Sidebar keeps its spruce identity, just a touch deeper for depth against the dark canvas */
    --color-sidebar-bg: #14261c;
    --color-sidebar-border: #0b160f;
    --color-sidebar-hover: rgba(255, 255, 255, 0.06);
    --color-sidebar-text: rgba(255, 255, 255, 0.6);
    --color-sidebar-text-active: #ffffff;
    --color-sidebar-accent: #e8974a;

    --color-grey-hover: #1c2a21;
  }

  --border-radius-tiny: 0.25rem;
  --border-radius-sm: 0.5rem;
  --border-radius-md: 0.75rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;
  --border-radius-full: 9999px;

  --font-editorial: "Newsreader", serif;
  --font-operational: "Plus Jakarta Sans", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: var(--font-operational);
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.55;
  font-size: 1.6rem;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(30, 57, 42, 0.12);
  border-color: var(--color-brand-600);
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

h1, h2, h3 {
  font-family: var(--font-editorial);
  color: var(--color-grey-800);
  letter-spacing: -0.015em;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
