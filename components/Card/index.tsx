import Router from "next/router";
import Image from "next/image";
import { IProperty } from "../../pages/busca";
import imagem from "../../assets/imovel.webp";
import imagem2 from "../../assets/imovel2.webp";

interface CardProps {
  property: IProperty;
}

export default function Card({
  property: { streetName, id, images },
}: CardProps) {
  const clickSubmit = () => {
    Router.push(`/imovel/${id}`);
  };

  return (
    <div onClick={clickSubmit} key={streetName} className="card">
      <div className="card-details">
        <Image
          className="imgCard"
          src={Math.floor(Math.random() * 10) % 2 === 1 ? imagem : imagem2}
          alt=""
          width={300}
          height={175}
        />
        <div className="card-details-bottom">
          <h3>{streetName}</h3>
          <span className="district">Nazaré, Belém</span>
          <div className="card-details-basic-info">
            <span>
              <i className="fa fa-arrows-h" aria-hidden="true"></i>
              98 m<sup>2</sup>
            </span>
            <span>
              <i className="fa fa-bed" aria-hidden="true"></i>2 quartos
            </span>
          </div>
          <div className="card-details-price">
            <span>Aluguel</span>
            <span>R$ 1.400,00</span>
            <div className="card-details-price-total">Total R$ 1.553,00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
