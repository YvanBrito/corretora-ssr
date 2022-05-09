import type { NextPage } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../../components/Layout";

interface EstateParams {
  params: {
    id: string;
  };
}

interface EstateProps {
  id: string;
}

export async function getStaticProps({ params }: EstateParams) {
  return {
    props: {
      id: params.id,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: "0",
        },
      },
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
      {
        params: {
          id: "3",
        },
      },
      {
        params: {
          id: "4",
        },
      },
      {
        params: {
          id: "5",
        },
      },
      {
        params: {
          id: "6",
        },
      },
      {
        params: {
          id: "7",
        },
      },
      {
        params: {
          id: "8",
        },
      },
      {
        params: {
          id: "9",
        },
      },
    ],
    fallback: false,
  };
}

export default function Estate({ id }: EstateProps) {
  return <section className="main-section">{id}</section>;
}

Estate.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
