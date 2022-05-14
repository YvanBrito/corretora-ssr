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
  propertyType: string[];
}

const typeMap: Map<string, string> = new Map([
  ["house", "Casa"],
  ["apartment", "Apartamento"],
  ["kitnet", "Kitnet"],
  ["condominium", "Casa de Condomínio"],
]);

export async function getStaticProps() {
  const rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  const properties: IProperty[] = JSON.parse(rawdata);
  const propertiesMapped: IPropertyMapped[] = properties.map(
    (p: IProperty) => ({
      ...p,
      type: typeMap.get(p.type) || "",
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
  const [propertiesFiltered, setPropertiesFiltered] =
    useState<IPropertyMapped[]>(propertiesMapped);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    propertyType: [],
    acquisitionType: "rent",
  });

  const clickSubmit = () => {
    const newPropertiesFiltered = propertiesMapped.filter(
      (p) =>
        filterParams.propertyType.filter(
          (type: string) => p.type === typeMap.get(type)
        ).length > 0
    );
    setPropertiesFiltered(newPropertiesFiltered);
    setShowModal(false);
    // Router.push(`/busca?${queryString}`);
  };

  const changePropertyType = (e: any) => {
    let valueToBeSet: string[] = [];
    setFilterParams((oldState) => {
      if (oldState.propertyType.includes(e.target.value)) {
        valueToBeSet = oldState.propertyType.filter(
          (type) => type !== e.target.value
        );
      } else {
        valueToBeSet = [...oldState.propertyType, e.target.value];
      }
      return {
        ...oldState,
        propertyType: valueToBeSet,
      };
    });
  };

  return (
    <>
      <Head>
        <title>Corretora - Busca</title>
      </Head>
      <div className="main-search-content-size">
        <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
          <div className="modal-wrapper">
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
                    <h3>Tipo de imóvel</h3>
                    <div className="input-radio">
                      <input
                        type="radio"
                        checked={filterParams.propertyType.includes(
                          "apartment"
                        )}
                        id="apartment"
                        value="apartment"
                        onChange={() => ({})}
                        onClick={changePropertyType}
                      />
                      <label htmlFor="apartment">Apartamento</label>
                    </div>

                    <div className="input-radio">
                      <input
                        type="radio"
                        checked={filterParams.propertyType.includes("house")}
                        id="house"
                        value="house"
                        onChange={() => ({})}
                        onClick={changePropertyType}
                      />
                      <label htmlFor="house">Casa</label>
                    </div>

                    <div className="input-radio">
                      <input
                        type="radio"
                        checked={filterParams.propertyType.includes(
                          "condominium"
                        )}
                        id="condominium"
                        value="condominium"
                        onChange={() => ({})}
                        onClick={changePropertyType}
                      />
                      <label htmlFor="condominium">Casa de Condomínio</label>
                    </div>

                    <div className="input-radio">
                      <input
                        type="radio"
                        checked={filterParams.propertyType.includes("kitnet")}
                        id="kitnet"
                        value="kitnet"
                        onChange={() => ({})}
                        onClick={changePropertyType}
                      />
                      <label htmlFor="kitnet">Kitnet</label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="propertyType">
                    <h3>Tipo de imóvel</h3>
                    <div className="input-radio">
                      <input
                        type="radio"
                        checked={filterParams.propertyType.includes(
                          "apartment"
                        )}
                        id="apartment"
                        name="propertyType"
                        value="apartment"
                        onChange={changePropertyType}
                      />
                      <label htmlFor="apartment">Apartamento</label>
                    </div>

                    <div className="input-radio">
                      <input
                        type="radio"
                        checked={filterParams.propertyType.includes("house")}
                        id="house"
                        name="propertyType"
                        value="house"
                        onChange={changePropertyType}
                      />
                      <label htmlFor="house">Casa</label>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary">
                Limpar filtros
              </button>
              <button onClick={clickSubmit} className="btn-primary">
                Filtrar
              </button>
            </div>
          </div>
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
            {propertiesFiltered?.map((property, index) => (
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
