import fs from "fs";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Layout from "../../components/Layout";
import { IProperty } from "../busca";

interface PropertyParams {
  params: {
    id: string;
  };
}

interface PropertyProps {
  property: IProperty;
}

export async function getStaticPaths() {
  let rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  let properties: IProperty[] = JSON.parse(rawdata);
  const paths = properties.map(({ id }: IProperty) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: PropertyParams) {
  let rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  let properties: IProperty[] = JSON.parse(rawdata);
  const property = properties.find(
    ({ id }: IProperty) => id.toString() === params.id
  );
  return {
    props: {
      property,
    },
  };
}

export default function Property({ property }: PropertyProps) {
  const [selectedImg, setSelectedImg] = useState<number>(0);
  return (
    <>
      <Head>
        <title>Corretora - Imóvel</title>
      </Head>
      <section className="imovel-section">
        <div className="preview">
          <div className="carousel">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg((oldState) =>
                  oldState > 0 ? --oldState : oldState
                );
              }}
              className="side-controllers side-controllers-left"
            ></div>
            <div className="showcase">
              <div
                style={{
                  transform: `translateX(calc(${-34 * selectedImg}rem))`,
                }}
                className="teste"
              >
                {property.images.map((img, index) => (
                  <div
                    key={index}
                    className={`frame ${
                      selectedImg === index && "frame-selected"
                    }`}
                  >
                    <Image layout="fill" alt="image" src={`/assets/${img}`} />
                  </div>
                ))}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg((oldState) =>
                  oldState < property.images.length - 1 ? ++oldState : oldState
                );
              }}
              className="side-controllers side-controllers-right"
            ></div>
          </div>
        </div>
        <div className="bottom">
          <div className="content">
            <div className="info">
              <div className="btnPreviewGroup">
                <button>360ª</button>
                <button>Fotos</button>
                <button>Mapa</button>
              </div>
            </div>
            <div className="actionCard">
              <h3>Imóvel concorrido</h3>
              <span>Este imóvel tem altas chances de ser alugado logo</span>
              <div className="separator"></div>
              <table>
                <tr>
                  <td>Aluguel</td>
                  <td className="tdRight">R$ 200,00</td>
                </tr>
                <tr>
                  <td>Condomínio</td>
                  <td className="tdRight">R$ 200,00</td>
                </tr>
                <tr>
                  <td>IPTU</td>
                  <td className="tdRight">R$ 200,00</td>
                </tr>
                <tr>
                  <td>Seguro incêndio</td>
                  <td className="tdRight">R$ 200,00</td>
                </tr>
              </table>
              <div className="separator"></div>
              <table>
                <tr>
                  <td>Total</td>
                  <td className="tdTotal">R$ 800,00</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Property.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
