import Router from "next/router";
import Image from "next/image";
import { IPropertyMapped } from "../../pages/busca";
import imagem2 from "../../assets/imovel2.webp";

interface CardProps {
  property: IPropertyMapped;
}

export default function Card({ property }: CardProps) {
  const clickSubmit = () => {
    Router.push(`/imovel/${property.id}`);
  };

  return (
    <div onClick={clickSubmit} key={property.streetName} className="card">
      <div className="card-details">
        <Image
          className="imgCard"
          src={imagem2}
          alt=""
          width={300}
          height={200}
        />
        <div className="card-details-bottom">
          <span className="property-type">{property.type}</span>
          <h3>{property.streetName}</h3>
          <span className="district">
            {property.district}, {property.city}
          </span>
          <div className="card-details-basic-info">
            <span>
              <i className="fa fa-arrows-h" aria-hidden="true"></i>
              {property.area} m<sup>2</sup>
            </span>
            <span>
              <i className="fa fa-bed" aria-hidden="true"></i>
              {property.bedroomsQty} quartos
            </span>
          </div>
          <div className="card-details-price">
            <span>Aluguel</span>
            <span>{property.rentPrice}</span>
            <div className="card-details-price-total">
              Total {property.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
