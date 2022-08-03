import { FormEvent, ReactElement, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Router from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";

export default function Home() {
  const [checked, setChecked] = useState<"buy" | "rent">("rent");
  const [inputValue, setInputValue] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
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

    Router.push(
      `/busca?${queryString}&lat=${location.lat}&lng=${location.lng}`
    );
  };

  const handleSelect = (address: string) => {
    setInputValue(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLocation({ lat, lng });
        console.log("Success", { lat, lng });
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <>
      <Head>
        <title>Corretora - Home</title>
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
                <option value="all">Todos</option>
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
              </select>
              <PlacesAutocomplete
                value={inputValue}
                onChange={(address) => setInputValue(address)}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Procurar lugar...",
                      })}
                      className="text-input text-input--home"
                      type="text"
                      name="location"
                      id="location"
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                            key={index}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <button type="submit" className="btn-primary">
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
