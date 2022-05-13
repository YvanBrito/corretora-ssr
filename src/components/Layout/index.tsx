import { ReactNode } from "react";
import MyFooter from "../Footer";
import MyHeader from "../Header";

type PropsWithChildren = { children?: ReactNode };

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MyHeader />
      {children}
      <MyFooter />
    </>
  );
}
