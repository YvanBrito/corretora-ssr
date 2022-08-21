/* eslint-disable @next/next/no-sync-scripts */
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import MyFooter from "../Footer";
import MyHeader from "../Header";
import { defaultTheme } from "../../theme";

import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

type PropsWithChildren = { children?: ReactNode };

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <MyHeader />
        {children}
        <MyFooter />
      </Wrapper>
    </ThemeProvider>
  );
}
