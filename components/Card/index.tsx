import { FormEvent } from "react";
import Router from "next/router";

interface CardProps {
  t: string;
  id: number;
}

export default function Card({ t, id }: CardProps) {
  const clickSubmit = () => {
    Router.push(`/imovel/${id}`);
  };

  return (
    <div onClick={clickSubmit} key={t} className="card">
      <div className="card-details">
        <h3>{t}</h3>
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
  );
}
