import { ReactNode } from "react";
import Head from "next/head";
import MyFooter from "../Footer";
import MyHeader from "../Header";

type PropsWithChildren = { children?: ReactNode };

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"crossorigin"}
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href={
            "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
          }
          rel="stylesheet"
        />
      </Head>
      <MyHeader />
      {children}
      <MyFooter />
    </>
  );
}
