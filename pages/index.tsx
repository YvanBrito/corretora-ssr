import { FormEvent, ReactElement, useState } from "react";
import type { NextPage } from "next";
import Router from "next/router";
import Layout from "../components/Layout";

export default function Home() {
  const [checked, setChecked] = useState<"buy" | "rent">("buy");
  const clickSubmit = (e: FormEvent) => {
    e.preventDefault();
    Router.push("/busca");
  };

  return (
    <section className="main-section">
      <div className="container">
        <h1 className="main-title">Garanta já seu imóvel</h1>
        <form onSubmit={clickSubmit} id="searchForm" className="home-form">
          <div className="estate-types">
            <div>
              <input
                type="radio"
                checked={checked === "buy"}
                id="buy"
                name="acquisitionType"
                value="buy"
                onChange={() => setChecked("buy")}
              />
              <label htmlFor="buy">Comprar</label>
              <br />
            </div>
            <div>
              <input
                type="radio"
                checked={checked === "rent"}
                id="rent"
                name="acquisitionType"
                value="rent"
                onChange={() => setChecked("rent")}
              />
              <label htmlFor="rent">Alugar</label>
              <br />
            </div>
          </div>
          <div className="bottom-search-field">
            <select
              className="select-input"
              name="estateType"
              id="selectEstateType"
            >
              <option value="house">Casa</option>
              <option value="apartment">Apartamento</option>
            </select>
            <input
              className="text-input text-input--home"
              placeholder="Endereço"
              type="text"
              name="location"
              id="location"
            />
            <button type="submit" className="btn">
              Pesquisar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
