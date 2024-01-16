import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --font-family: 'Inter', 'Pretendard', sans-serif;

  --font-size-min: 9px;
  --font-size-smaller: 10px;
  --font-size-sm: 12px;
  --font-size-md: 14px;
  --font-size-lg: 18px;
  --font-size-big: 24px;
  --font-size-max: 32px;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-semibold: 500;
  --font-weight-bold: 600;
  --font-weight-extrabold: 700;

  --duration: 0.3s;
  --transition: var(--duration) ease;

  --border-solid: 1px solid var(--color-gray-200);

  --round-sm: 8px;
  --round-md: 14px;
  --round-lg: 18px;

  --color-card-blue-100: rgba(0, 169, 255, 0.1);
  --color-card-blue-600: #00A9FF;

  --color-card-yellow-100: rgba(255, 196, 54, 0.1);
  --color-card-yellow-600: #FFC436;

  --color-card-orange-100: rgba(248, 111, 3, 0.1);
  --color-card-orange-600: #F86F03;

  --color-card-green-100: rgba(125, 206, 19, 0.1);
  --color-card-green-600: #7DCE13;

  --color-green-100: rgba(22, 163, 27, 0.1);
  --color-green-600: #16a34a;

  --color-blue-100: rgba(88, 178, 242, 0.1);
  --color-blue-600: #58B2F2;
  
  --color-orange-100: rgba(243, 182, 100, 0.1);
  --color-orange-600: #F3B664;

  --color-red-100: rgba(239, 64, 64, 0.1);
  --color-red-600: #EF4040;

  --color-danger-500: #D71313;
  --color-danger-600: #BD0A0A;
  --color-danger-700: #AE0F0F;

  --color-modal-bg: rgba(0, 0, 0, 0.5);

  --shadow: 0 0 20px rgba(0, 0, 0, 0.045);

  &,
  &.light-mode {

    --color-font: var(--color-gray-700);

    --color-accent-orange: #F9B572;
    --color-accent-purple: #BEADFA;
    --color-accent-pink: #F7A4A4;
    --color-accent-yellow: #FFD966;
    --color-accent-green: #C9F4AA;
    --color-accent-blue: #AEE2FF;

    --color-primary-50: #FFF6E2;
    --color-primary-100: #FFF2D4;
    --color-primary-200: #FFE9B5;
    --color-primary-300: #FFDD8F;
    --color-primary-400: #FFD36F;
    --color-primary-500: #F9C755;
    --color-primary-600: #F2BB3C;

    --color-primary-text: #fff;

    --color-pale-purple-50:  #FAFAFF;
    --color-pale-purple-100:  #F4F4FC;
    --color-pale-purple-200:  #EBEBF5;
    --color-pale-purple-300:  #E3E3F0;

    --color-slate-400: #959DAA;
    
    --color-gray-0--50: rgba(255, 255, 255, 0.5);
    --color-gray-0: #fff;
    --color-gray-100: #f5f5f5;
    --color-gray-200: #e5e5e5;
    --color-gray-300: #d6d3d1;
    --color-gray-400: #a3a3a3;
    --color-gray-500: #737373;
    --color-gray-600: #525252;
    --color-gray-700: #444;
  }

  &.dark-mode {

    --color-accent-orange: #E19C58;
    --color-accent-purple: #A490EB;
    --color-accent-pink: #E09090;
    --color-accent-yellow: #E6C253;
    --color-accent-green: #B1E28D;
    --color-accent-blue: #93C9E7;

    --color-primary-50: rgba(251, 230, 171, 0.05);
    --color-primary-100: #FFDD8F;
    --color-primary-200: #FFD36F;
    --color-primary-300: #F9C755;
    --color-primary-400: #F2BB3C;
    --color-primary-500: #E9AE28;
    --color-primary-600: #D99F19;

    --color-pale-purple-50: #37373B;
    --color-pale-purple-100: #222226;
    --color-pale-purple-200: #1D1D20;
    --color-pale-purple-300: #515157;

    --color-gray-0--50: rgba(44, 44, 48, 0.5);
    --color-gray-0: #2C2C30;
    --color-gray-100: #35353B;
    --color-gray-200: #404048;
    --color-gray-300: #47474F;
    --color-gray-400: #63636D;
    --color-gray-500: #7D7D8A;
    --color-gray-600: #878795;
    --color-gray-900: #e5e5e5;
    /* --color-gray-100: #4A4A51;
    --color-gray-200: #5D5D65;
    --color-gray-700: #e5e5e5; */

    --color-font: var(--color-gray-900);

    input[type='date'] {
      color-scheme: dark;
    }
  }
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

a:link,
a:visited,
a:hover,
a:active {
  color: inherit;
  font: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  color: inherit;
  font: inherit;
  border: none;
  border-radius: unset;
  background: none;
  outline: none;
}

textarea {
  padding: 14px;
  border-radius: var(--round-sm);
  resize: none;
}

button {
  cursor: pointer;
}

ol,
ul,
li {
  list-style: none;
}

svg {
  transition: color var(--transition);
}

::-webkit-scrollbar {
  display: none;
}

body {
  color: var(--color-font);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  font-family: var(--font-family);
  line-height: 1;
  background-color: var(--color-pale-purple-200);
  transition: background-color var(--transition);
}

aside.EmojiPickerReact.epr-main {
  position: absolute;
  top: calc(100% + 24px);
  left: 0;
}

@media only screen and (max-width: 720px) {
  body {
    --font-size-min: 8px;
    --font-size-smaller: 9px;
    --font-size-sm: 11px;
    --font-size-md: 13px;
    --font-size-lg: 16px;
    --font-size-big: 22px;
    --font-size-max: 28px;
  }
}

`;

export default GlobalStyles;
