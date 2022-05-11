import { ReactElement, useState } from "react";
import fs from "fs";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import Head from "next/head";

export interface IProperty {
  id: number;
  createdAt: string;
  type: string;
  isRent: true;
  streetName: string;
  district: string;
  area: number;
  longitude: number;
  latitude: number;
  bedroomsQty: number;
  bathroomQty: number;
  rentPrice: number;
  buyPrice: number;
  iptu: number;
  condominiumPrice: number;
  serviceRate: number;
  isPetFriendly: boolean;
  furnished: boolean;
  floor: number;
  carSpot: number;
  images: string[];
}
interface SearchProps {
  properties: IProperty[];
}

export async function getStaticProps() {
  let rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  let properties: IProperty[] = JSON.parse(rawdata);
  return {
    props: {
      properties,
    },
  };
}
export default function Search({ properties }: SearchProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Busca</title>
      </Head>
      <div className="main-search-content-size">
        <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
          <p>Teste</p>
        </Modal>
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
            <button onClick={() => setShowModal(true)} className="btn-filter">
              Filtrar
            </button>
          </div>
          <div className="shelf">
            {properties.map((property, index) => (
              <Card key={index} property={property} />
            ))}
          </div>
        </section>
        <section className="map-side"></section>
      </div>
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
