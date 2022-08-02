import { ReactElement, useEffect, useState } from "react";
import fs from "fs";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import LoadingCard from "../../components/LoadingCard";
import Map, { IBounds } from "../../components/Map";
import { propertyMapper, typeMap } from "../../utils/propertyMapper";
import { Marker, MarkerClusterer } from "@react-google-maps/api";

export interface IProperty {
  id: number;
  createdAt: string;
  type: string;
  isRent: true;
  address: {
    streetName: string;
    number: string;
    district: string;
    city: string;
    state: string;
    stateInitials: string;
  };
  description: string;
  area: number;
  lng: number;
  lat: number;
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
  seller: {
    name: string;
    phone: number;
    email: string;
  };
  images: string[];
}

export interface IPropertyMapped {
  id: number;
  createdAt: string;
  type: string;
  isRent: true;
  address: {
    streetName: string;
    number: string;
    district: string;
    city: string;
    state: string;
    stateInitials: string;
  };
  description: string;
  area: number;
  lng: number;
  lat: number;
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
  seller: {
    name: string;
    phone: number;
    email: string;
  };
  images: string[];
}

interface SearchProps {
  propertiesMapped: IPropertyMapped[];
}

interface IFilterParams {
  acquisitionType: "rent" | "buy";
  propertyType: string[];
}

const defaultParams: IFilterParams = {
  acquisitionType: "rent",
  propertyType: [],
};

interface IPosition {
  lat: number;
  lng: number;
}

export async function getStaticProps() {
  const rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  const properties: IProperty[] = JSON.parse(rawdata);
  const propertiesMapped: IPropertyMapped[] = propertyMapper(properties);
  return {
    props: {
      propertiesMapped,
    },
  };
}
export default function Search({ propertiesMapped }: SearchProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [propertiesFiltered, setPropertiesFiltered] = useState<
    IPropertyMapped[]
  >([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterParams, setFilterParams] =
    useState<IFilterParams>(defaultParams);
  const [center, setCenter] = useState<IPosition>({
    lat: Number(router.query.lat || 0),
    lng: Number(router.query.lng || 0),
  });

  const clickSubmit = () => {
    setShowModal(false);
    setIsLoading(true);
    setTimeout(() => {
      const newPropertiesFiltered = propertiesMapped.filter((p) => {
        if (filterParams.propertyType.length > 0) {
          return (
            filterParams.propertyType.filter(
              (type: string) => p.type === typeMap.get(type)
            ).length > 0
          );
        } else {
          return p;
        }
      });
      setPropertiesFiltered(newPropertiesFiltered);
      setIsLoading(false);
    }, 2000);
    // Router.push(`/busca?${queryString}`);
  };
  const onChangeMapBounds = ({ sw, ne }: IBounds) => {
    setIsLoading(true);
    setTimeout(() => {
      const newPropertiesFiltered = propertiesMapped.filter((p) => {
        if (
          p.lat > (sw.lat || -Infinity) &&
          p.lat < (ne.lat || Infinity) &&
          p.lng > (sw.lng || -Infinity) &&
          p.lng < (ne.lng || Infinity)
        ) {
          return p;
        }
      });
      setPropertiesFiltered(newPropertiesFiltered);
      setIsLoading(false);
    }, 2000);
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

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setPropertiesFiltered(propertiesMapped);
      setIsLoading(false);
    }, 2000);
  }, []);

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
                  <h3>Tipo de imóvel</h3>
                  <div className="property-type-inputs">
                    {Array.from(typeMap.keys()).map((type) => (
                      <div key={type} className="input-radio">
                        <input
                          type="radio"
                          checked={filterParams.propertyType.includes(type)}
                          id={type}
                          value={type}
                          onChange={() => ({})}
                          onClick={changePropertyType}
                        />
                        <label htmlFor={type}>{typeMap.get(type)}</label>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3>Tipo de imóvel</h3>
                  <div className="property-type-inputs">
                    {Array.from(typeMap.keys()).map((type) => (
                      <div key={type} className="input-radio">
                        <input
                          type="radio"
                          checked={filterParams.propertyType.includes(type)}
                          id={type}
                          value={type}
                          onChange={() => ({})}
                          onClick={changePropertyType}
                        />
                        <label htmlFor={type}>{typeMap.get(type)}</label>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setFilterParams(defaultParams)}
                className="btn-secondary"
              >
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
                <li>{router.query.location}</li>
              </ul>
            </nav>
            <button onClick={() => setShowModal(true)} className="btn-filter">
              Filtrar
            </button>
          </div>
          <div className="shelf">
            {isLoading ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : (
              <>
                {propertiesFiltered?.map((property, index) => (
                  <Card key={index} property={property} />
                ))}
              </>
            )}
          </div>
        </section>
        <section className="map-side">
          <Map center={center} getBounds={onChangeMapBounds}>
            <>
              <MarkerClusterer
                options={{
                  imagePath:
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
                }}
              >
                {(clusterer) => (
                  <>
                    {propertiesFiltered.map((p, index) => (
                      <Marker
                        key={index}
                        position={{ lat: p.lat, lng: p.lng }}
                        clusterer={clusterer}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>
              {/* {propertiesFiltered?.map((property, index) => (
                <Marker
                  key={index}
                  position={{ lat: property.lat, lng: property.lng }}
                />
              ))} */}
            </>
          </Map>
        </section>
      </div>
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
