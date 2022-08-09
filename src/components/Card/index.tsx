import { useState } from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { IPropertyMapped } from "../../pages/busca";

import * as S from "./styles";

interface CardProps {
  property: IPropertyMapped;
}

export default function Card({ property }: CardProps) {
  const [imgSelected, setImgSelected] = useState<number>(0);

  const clickSubmit = () => {
    Router.push(`/imovel/${property.id}`);
  };

  return (
    <S.CardWrapper onClick={clickSubmit} key={property.address.streetName}>
      <S.CardDetails>
        <S.CardDetailsTop
          style={{
            backgroundImage: `url("/assets/imoveis/${property.images[imgSelected]}")`,
          }}
        >
          <S.Interectables>
            <S.Side>
              <S.SideControllersLeft
                onClick={(e) => {
                  e.stopPropagation();
                  setImgSelected((oldState) =>
                    oldState > 0 ? --oldState : oldState
                  );
                }}
              ></S.SideControllersLeft>
              <S.SideControllersRight
                onClick={(e) => {
                  e.stopPropagation();
                  setImgSelected((oldState) =>
                    oldState < 4 && oldState < property.images.length - 1
                      ? ++oldState
                      : oldState
                  );
                }}
              ></S.SideControllersRight>
            </S.Side>
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
          </S.Interectables>
        </S.CardDetailsTop>
        <S.CardDetailsBottom>
          <span className="property-type">{property.type}</span>
          <h3>{property.address.streetName}</h3>
          <span className="district">
            {property.address.district}, {property.address.city}
          </span>
          <div className="basic-info">
            <span>
              <FontAwesomeIcon width={20} icon={Icon.faRuler} />{" "}
              {" " + property.area} m<sup>2</sup>
            </span>
            <span>
              <FontAwesomeIcon width={20} icon={Icon.faBed} />{" "}
              {" " + property.bedroomsQty} quartos
            </span>
          </div>
          <div className="price">
            <span>Aluguel</span>
            <span>{property.rentPrice}</span>
            <div className="total">Total {property.totalPrice}</div>
          </div>
        </S.CardDetailsBottom>
      </S.CardDetails>
    </S.CardWrapper>
  );
}
