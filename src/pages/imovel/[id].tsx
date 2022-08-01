import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import fs from "fs";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import { propertyMapper } from "../../utils/propertyMapper";
import { IProperty, IPropertyMapped } from "../busca";
import ImmersiveCam from "../../components/ImmersiveCam";
import Map from "../../components/Map";
import { Marker } from "@react-google-maps/api";

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
  const [showImmersiveCam, setShowImmersiveCam] = useState<boolean>(false);
  const [preview, setPreview] = useState<number>(0);
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const previewToRender = () => {
    switch (preview) {
      case 0:
        return <Carousel images={property.images} />;
      case 1:
        return <div>Teste</div>;
      case 2:
        return (
          <Map lat={property.lat} lng={property.lng}>
            <Marker position={{ lat: property.lat, lng: property.lng }} />
          </Map>
        );
      default:
        return <div>Undefined</div>;
    }
  };

  useEffect(() => {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        navigator.userAgent || navigator.vendor
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        (navigator.userAgent || navigator.vendor).substr(0, 4)
      )
    ) {
      setWhatsappLink("api");
    } else {
      setWhatsappLink("web");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Corretora - Imóvel</title>
      </Head>
      <Modal
        openModal={showImmersiveCam}
        handleClose={() => setShowImmersiveCam(false)}
      >
        <button
          className="close-immersive"
          onClick={() => setShowImmersiveCam(false)}
        >
          Fechar
        </button>
        <ImmersiveCam />
      </Modal>
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
            <div className="btn-preview-group">
              <button onClick={() => setPreview(0)}>Fotos</button>
              <button onClick={() => setShowImmersiveCam(true)}>360°</button>
              <button onClick={() => setPreview(2)}>Mapa</button>
            </div>
            <div className="top-description">
              <div className="details">
                <div className="detail">
                  <FontAwesomeIcon width={20} icon={Icon.faBed} />
                  <span>{property.bedroomsQty} quartos</span>
                </div>
                <div className="detail">
                  <FontAwesomeIcon width={18} icon={Icon.faRuler} />
                  <span>
                    {property.area} m<sup>2</sup>
                  </span>
                </div>
                <div className="detail">
                  <FontAwesomeIcon width={20} icon={Icon.faShower} />
                  <span>
                    {property.bathroomQty}{" "}
                    {property.bathroomQty > 1 ? "banheiros" : "banheiro"}
                  </span>
                </div>
                {property.isPetFriendly && (
                  <div className="detail">
                    <FontAwesomeIcon width={20} icon={Icon.faPaw} />
                    <span>Aceita pet</span>
                  </div>
                )}
                {property.furnished && (
                  <div className="detail">
                    <FontAwesomeIcon width={20} icon={Icon.faCouch} />
                    <span>Mobiliada</span>
                  </div>
                )}
                {property.carSpot > 0 && (
                  <div className="detail">
                    <FontAwesomeIcon width={20} icon={Icon.faCar} />
                    <span>
                      {property.carSpot}{" "}
                      {property.carSpot > 1 ? "vagas" : "vaga"}
                    </span>
                  </div>
                )}
                {property.floor > 0 && (
                  <div className="detail">
                    <FontAwesomeIcon width={20} icon={Icon.faHouse} />
                    <span>
                      {property.floor}{" "}
                      {property.floor > 1 ? "andares" : "andar"}
                    </span>
                  </div>
                )}
              </div>
              <div className="call-to-action">
                <a
                  href={`https://${whatsappLink}.whatsapp.com/send?phone=${
                    property.seller.phone
                  }&text=${"Texto aqui testando"}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>CONTATAR VENDEDOR</span>
                  <Image
                    width={30}
                    height={30}
                    alt="whatsapp"
                    src={"/assets/icons/icon-whatsapp-240.png"}
                  />
                </a>
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
