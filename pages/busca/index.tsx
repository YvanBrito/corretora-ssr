import { ReactElement, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

export default function Search() {
  const [test, setTest] = useState([
    "Rua",
    "Rua",
    "Rua",
    "Rua",
    "Rua",
    "Rua",
    "Rua",
    "Rua",
    "Rua",
    "Rua",
  ]);
  return (
    <div className="main-search-content-size">
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
          <button className="btn-filter">Filtrar</button>
        </div>
        <div className="shelf">
          {test.map((t) => (
            <div key={t} className="card">
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
                  <div className="card-details-price-total">
                    Total R$ 1.553,00
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="map-side"></section>
    </div>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
