import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
  }
  html {
    font-family: "Rubik", sans-serif;
    font-size: 62.5%;
  }

  body {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.palette.common.white};;
  }
`;

export default GlobalStyle;
