import { FormEvent, ReactElement, useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";

export default function Home() {
  const [checked, setChecked] = useState<"buy" | "rent">("rent");
  const clickSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    let queryString = Object.keys(formProps)
      .map((key) => {
        return (
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(formProps[key].toString())
        );
      })
      .join("&");

    Router.push(`/busca?${queryString}`);
  };

  return (
    <>
      <Head>
        <title>Corretora</title>
      </Head>
      <section className="main-section">
        <div className="container">
          <h1 className="main-title">Garanta já seu imóvel</h1>
          <form onSubmit={clickSubmit} id="searchForm" className="home-form">
            <div className="acquisition-types">
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
            </div>
            <div className="bottom-search-field">
              <select
                className="select-input"
                name="propertyType"
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
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
