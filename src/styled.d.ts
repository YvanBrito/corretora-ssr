import "styled-components";
interface IPalette {
  main: string;
  highlight: string;
  pressed: string;
  contrastText: string;
}
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    fontSize: string;
    palette: {
      border: string;
      background: IPalette;
      common: {
        black: string;
        white: string;
      };
      primary: IPalette;
      secondary: IPalette;
    };
  }
}
