import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "Rubik", sans-serif;
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.palette.common.white};;
  }

  span, p, a {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 2rem;
  }
`

export default GlobalStyle
