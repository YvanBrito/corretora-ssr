import React, { FormEvent, ReactElement, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import Router from 'next/router'
import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../components/Layout'

import S from './styles'
import PrimaryButton from '../components/PrimaryButton'

interface HomeInputs {
  propertyType: string
  acquisitionType: string
  location: string
}

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HomeInputs>()
  const [checked, setChecked] = useState<'buy' | 'rent'>('rent')
  const [inputValue, setInputValue] = useState<string>('')
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })
  const clickSubmit: SubmitHandler<HomeInputs> = (data: any) => {
    let queryString = Object.keys(data)
      .map((key) => {
        console.log(key, data[key])
        return data[key]
          ? encodeURIComponent(key) +
              '=' +
              encodeURIComponent(data[key].toString())
          : ''
      })
      .join('&')

    Router.push(`/busca?${queryString}&lat=${location.lat}&lng=${location.lng}`)
  }

  const handleSelect = (address: string) => {
    setInputValue(address)
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLocation({ lat, lng })
      })
      .catch((error) => console.error('Error', error))
  }

  return (
    <>
      <Head>
        <title>Corretora - Home</title>
      </Head>
      <S.MainSection>
        <S.BackgroundFront />
        <S.Container>
          <S.MainTitle>Garanta já seu imóvel</S.MainTitle>
          <S.HomeForm onSubmit={handleSubmit(clickSubmit)} id="searchForm">
            <S.AcquisitionTypes>
              <input
                {...register('acquisitionType')}
                type="radio"
                checked={checked === 'rent'}
                id="rent"
                value="rent"
                onChange={() => setChecked('rent')}
              />
              <label htmlFor="rent">Alugar</label>
              <br />
              <input
                {...register('acquisitionType')}
                type="radio"
                checked={checked === 'buy'}
                id="buy"
                value="buy"
                onChange={() => setChecked('buy')}
              />
              <label htmlFor="buy">Comprar</label>
              <br />
            </S.AcquisitionTypes>
            <S.BottomSearchField>
              <S.SelectInput
                {...register('propertyType')}
                id="selectEstateType"
              >
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
                      {...(register('location'), { required: true })}
                      {...getInputProps({
                        placeholder: 'Procurar lugar...',
                      })}
                      type="text"
                      id="location"
                    />
                    <div
                      style={{ position: 'absolute' }}
                      className="autocomplete-dropdown-container"
                    >
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item'
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' }
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
                        )
                      })}
                    </div>
                  </S.TextInputHome>
                )}
              </PlacesAutocomplete>
              <PrimaryButton label="Pesquisar" />
            </S.BottomSearchField>
          </S.HomeForm>
        </S.Container>
      </S.MainSection>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
