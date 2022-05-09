import { ReactElement, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/Card";

interface SearchProps {
  imoveis: string[];
}

export async function getStaticProps() {
  return {
    props: {
      imoveis: [
        "Rua",
        "Rua",
        "Rua",
        "Rua",
        "Rua",
        "Rua",
        "Rua",
        "Rua",
        "Rua",
        "Rua",
      ],
    },
  };
}
export default function Search({ imoveis }: SearchProps) {
  return (
    <div className="main-search-content-size">
      <section className="shelf-search">
        <div className="header-shelf-search">
          <nav>
            <ul>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>&gt;</li>
              <li>Belém, PA</li>
            </ul>
          </nav>
          <button className="btn-filter">Filtrar</button>
        </div>
        <div className="shelf">
          {imoveis.map((t, index) => (
            <Card key={index} t={t} id={index} />
          ))}
        </div>
      </section>
      <section className="map-side"></section>
    </div>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
