import { useState } from "react";
import Router from "next/router";
import { IPropertyMapped } from "../../pages/busca";

interface CardProps {
  property: IPropertyMapped;
}

export default function Card({ property }: CardProps) {
  const [imgSelected, setImgSelected] = useState<number>(0);

  const clickSubmit = () => {
    Router.push(`/imovel/${property.id}`);
  };

  return (
    <div onClick={clickSubmit} key={property.streetName} className="card">
      <div className="card-details">
        <div
          style={{
            backgroundImage: `url("/assets/${property.images[imgSelected]}")`,
          }}
          className="card-details-top"
        >
          <div className="interactables">
            <div className="side">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setImgSelected((oldState) =>
                    oldState > 0 ? --oldState : oldState
                  );
                }}
                className="side-controllers side-controllers-left"
              ></div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setImgSelected((oldState) =>
                    oldState < 4 && oldState < property.images.length - 1
                      ? ++oldState
                      : oldState
                  );
                }}
                className="side-controllers side-controllers-right"
              ></div>
            </div>
            <div>
              {property.images.map(
                (i, index) =>
                  index < 5 && (
                    <span
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImgSelected(index);
                      }}
                      className={
                        index === imgSelected ? "circle-selected" : "circle"
                      }
                    ></span>
                  )
              )}
            </div>
          </div>
        </div>
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
