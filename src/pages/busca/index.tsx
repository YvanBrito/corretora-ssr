import { FormEvent, ReactElement, useState } from "react";
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
  city: string;
  state: string;
  stateInitials: string;
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

export interface IPropertyMapped {
  id: number;
  createdAt: string;
  type: string;
  isRent: true;
  streetName: string;
  district: string;
  city: string;
  state: string;
  stateInitials: string;
  area: number;
  longitude: number;
  latitude: number;
  bedroomsQty: number;
  bathroomQty: number;
  rentPrice: string;
  buyPrice: string;
  iptu: string;
  totalPrice: string;
  condominiumPrice: string;
  serviceRate: string;
  isPetFriendly: boolean;
  furnished: boolean;
  floor: number;
  carSpot: number;
  images: string[];
}

interface SearchProps {
  propertiesMapped: IPropertyMapped[];
}

interface IFilterParams {
  acquisitionType: "rent" | "buy";
  propertyType: "apartment" | "house";
}

export async function getStaticProps() {
  const rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  const properties: IProperty[] = JSON.parse(rawdata);
  const propertiesMapped: IPropertyMapped[] = properties.map(
    (p: IProperty) => ({
      ...p,
      rentPrice: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(p.rentPrice),
      buyPrice: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(p.buyPrice),
      iptu: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(p.iptu),
      serviceRate: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(p.serviceRate),
      condominiumPrice: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(p.condominiumPrice),
      totalPrice: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(p.rentPrice + p.serviceRate + p.iptu + p.condominiumPrice),
    })
  );
  return {
    props: {
      propertiesMapped,
    },
  };
}
export default function Search({ propertiesMapped }: SearchProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    propertyType: "apartment",
    acquisitionType: "rent",
  });

  const clickSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    let queryString = Object.keys(formProps)
      .map((key) => {
        return (
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(formProps[key].toString())
        );
      })
      .join("&");
    console.log(queryString);
    setShowModal(false);
    // Router.push(`/busca?${queryString}`);
  };

  return (
    <>
      <Head>
        <title>Corretora - Busca</title>
      </Head>
      <div className="main-search-content-size">
        <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
          <form onSubmit={clickSubmit} className="modal-wrapper">
            <div className="modal-tabs">
              <input
                type="radio"
                checked={filterParams.acquisitionType === "rent"}
                id="rent"
                name="acquisitionType"
                value="rent"
                onChange={() =>
                  setFilterParams((oldState) => ({
                    ...oldState,
                    acquisitionType: "rent",
                  }))
                }
              />
              <label htmlFor="rent">Alugar</label>

              <input
                type="radio"
                checked={filterParams.acquisitionType === "buy"}
                id="buy"
                name="acquisitionType"
                value="buy"
                onChange={() =>
                  setFilterParams((oldState) => ({
                    ...oldState,
                    acquisitionType: "buy",
                  }))
                }
              />
              <label htmlFor="buy">Comprar</label>
            </div>
            <div className="filter-wrapper">
              {filterParams.acquisitionType === "rent" ? (
                <>
                  <div className="propertyType">
                    <input
                      type="radio"
                      checked={filterParams.propertyType === "apartment"}
                      id="apartment"
                      name="propertyType"
                      value="apartment"
                      onChange={() =>
                        setFilterParams((oldState) => ({
                          ...oldState,
                          propertyType: "apartment",
                        }))
                      }
                    />
                    <label htmlFor="apartment">Apartamento</label>

                    <input
                      type="radio"
                      checked={filterParams.propertyType === "house"}
                      id="house"
                      name="propertyType"
                      value="house"
                      onChange={() =>
                        setFilterParams((oldState) => ({
                          ...oldState,
                          propertyType: "house",
                        }))
                      }
                    />
                    <label htmlFor="house">Casa</label>
                  </div>
                </>
              ) : (
                <div>Filtro Compra</div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary">
                Limpar filtros
              </button>
              <button type="submit" className="btn-primary">
                Filtrar
              </button>
            </div>
          </form>
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
            {propertiesMapped?.map((property, index) => (
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
