import type { NextPage } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../../components/Layout";

export default function Estate() {
  return <section className="main-section"></section>;
}

Estate.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
