/* eslint-disable @next/next/no-sync-scripts */
import { ReactNode } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import MyFooter from "../Footer";
import MyHeader from "../Header";
import { defaultTheme } from "../../theme";

type PropsWithChildren = { children?: ReactNode };

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MyHeader />
      {children}
      <MyFooter />
    </ThemeProvider>
  );
}
