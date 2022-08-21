import React, { FormEvent, ReactElement, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Router from "next/router";
import Head from "next/head";
import Layout from "../components/Layout";

import S from "../styles/pages/home";

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
      <S.MainSection>
        <S.BackgroundFront />
        <S.Container>
          <S.MainTitle>Garanta já seu imóvel</S.MainTitle>
          <S.HomeForm onSubmit={clickSubmit} id="searchForm">
            <S.AcquisitionTypes>
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
            </S.AcquisitionTypes>
            <S.BottomSearchField>
              <S.SelectInput name="propertyType" id="selectEstateType">
                <option value="all">Todos</option>
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
              </S.SelectInput>
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
                  <S.TextInputHome>
                    <input
                      {...getInputProps({
                        placeholder: "Procurar lugar...",
                      })}
                      type="text"
                      name="location"
                      id="location"
                    />
                    <div
                      style={{ position: "absolute" }}
                      className="autocomplete-dropdown-container"
                    >
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
                  </S.TextInputHome>
                )}
              </PlacesAutocomplete>
              <S.BtnPrimary type="submit">Pesquisar</S.BtnPrimary>
            </S.BottomSearchField>
          </S.HomeForm>
        </S.Container>
      </S.MainSection>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
