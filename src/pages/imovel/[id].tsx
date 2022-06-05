import fs from "fs";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Carousel from "../../components/Carousel";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import { propertyMapper } from "../../utils/propertyMapper";
import { IProperty, IPropertyMapped } from "../busca";

interface PropertyParams {
  params: {
    id: string;
  };
}

interface PropertyProps {
  property: IPropertyMapped;
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
  const propertiesMapped: IPropertyMapped[] = propertyMapper(properties);
  const property = propertiesMapped.find(
    ({ id }: IPropertyMapped) => id.toString() === params.id
  );
  return {
    props: {
      property,
    },
  };
}

export default function Property({ property }: PropertyProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<number>(0);

  const previewToRender = () => {
    console.log(preview);
    switch (preview) {
      case 0:
        return <Carousel images={property.images} />;
      case 1:
        return <div>360°</div>;
      case 2:
        return <div>Mapa</div>;
      default:
        return <div>Undefined</div>;
    }
  };

  return (
    <>
      <Head>
        <title>Corretora - Imóvel</title>
      </Head>
      <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
        <div className="actionCard">
          <h3>Imóvel concorrido</h3>
          <span>Este imóvel tem altas chances de ser alugado logo</span>
          <div className="separator"></div>
          <table>
            <tbody>
              <tr>
                <td>Aluguel</td>
                <td className="tdRight">{property.rentPrice}</td>
              </tr>
              <tr>
                <td>Condomínio</td>
                <td className="tdRight">{property.condominiumPrice}</td>
              </tr>
              <tr>
                <td>IPTU</td>
                <td className="tdRight">{property.iptu}</td>
              </tr>
              <tr>
                <td>Taxa de serviço</td>
                <td className="tdRight">{property.serviceRate}</td>
              </tr>
            </tbody>
          </table>
          <div className="separator"></div>
          <table>
            <tbody>
              <tr>
                <td>Total</td>
                <td className="tdTotal">{property.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      <section className="imovel-section">
        <div className="top">
          <div className="content">
            <div className="title">
              <span className="main">
                {property.address.streetName}, {property.address.number}{" "}
              </span>
              <span className="subtitle">
                {property.address.district}, {property.address.city} -{" "}
                {property.address.stateInitials}
              </span>
            </div>
            <div className="priceBtn" onClick={() => setShowModal(true)}>
              <span className="price">{property.totalPrice}</span>
              <div className="triangle">
                <Image
                  width={15}
                  height={15}
                  alt="image"
                  src={"/assets/icons/icon-question-64.png"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="preview">{previewToRender()}</div>
        <div className="bottom">
          <div className="content">
            <div className="btnPreviewGroup">
              <button onClick={() => setPreview(0)}>Fotos</button>
              <button onClick={() => setPreview(1)}>360°</button>
              <button onClick={() => setPreview(2)}>Mapa</button>
            </div>
            <div className="details">
              <div className="detail">
                <i className="fa fa-bed" aria-hidden="true"></i>
                <span>{property.bedroomsQty} quartos</span>
              </div>
              <div className="detail">
                <i className="fa fa-arrows-h" aria-hidden="true"></i>
                <span>
                  {property.area} m<sup>2</sup>
                </span>
              </div>
            </div>
            <div className="info">
              <h1>Descrição</h1>
              <p>{property.description}</p>
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
