import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Marker, MarkerClusterer } from '@react-google-maps/api'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Modal from '../../components/Modal'
import LoadingCard from '../../components/LoadingCard'
import Map, { IBounds } from '../../components/Map'
import { propertiesMapper, typeMap } from '../../utils/propertyMapper'
import api from '../../utils/api'

import S from './styles'

export interface IProperty {
  id: number
  createdAt: string
  type: string
  isRent: true
  address: {
    streetName: string
    number: string
    district: string
    city: string
    state: string
    stateInitials: string
  }
  description: string
  area: number
  lng: number
  lat: number
  bedroomsQty: number
  bathroomQty: number
  rentPrice: number
  buyPrice: number
  iptu: number
  condominiumPrice: number
  serviceRate: number
  isPetFriendly: boolean
  furnished: boolean
  floor: number
  carSpot: number
  seller: {
    name: string
    phone: number
    email: string
  }
  images: string[]
}

export interface IPropertyMapped {
  id: number
  createdAt: string
  type: string
  isRent: true
  address: {
    streetName: string
    number: string
    district: string
    city: string
    state: string
    stateInitials: string
  }
  description: string
  area: number
  lng: number
  lat: number
  bedroomsQty: number
  bathroomQty: number
  rentPrice: string
  buyPrice: string
  iptu: string
  totalPrice: string
  condominiumPrice: string
  serviceRate: string
  isPetFriendly: boolean
  furnished: boolean
  floor: number
  carSpot: number
  seller: {
    name: string
    phone: number
    email: string
  }
  images: string[]
}

interface SearchProps {
  propertiesMapped: IPropertyMapped[]
}

interface IFilterParams {
  acquisitionType: 'rent' | 'buy'
  propertyType: string[]
}

const defaultParams: IFilterParams = {
  acquisitionType: 'rent',
  propertyType: [],
}

interface IPosition {
  lat: number
  lng: number
}
export default function Search() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [propertiesFiltered, setPropertiesFiltered] = useState<
    IPropertyMapped[]
  >([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [filterParams, setFilterParams] = useState<IFilterParams>(defaultParams)
  const [center, setCenter] = useState<IPosition>()

  const [bounds, setBounds] = useState<IBounds>()

  const searchProperties = async () => {
    const propertyTypeParams = filterParams.propertyType.reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue +
        `${currentIndex === 0 ? '' : '&'}propertyType=` +
        currentValue,
      '',
    )

    setIsLoading(true)

    let { properties } = await api.get('property/filter', {
      swlat: bounds?.sw.lat,
      swlng: bounds?.sw.lng,
      nelat: bounds?.ne.lat,
      nelng: bounds?.ne.lng,
      propertyTypeParams: filterParams.propertyType,
    })

    setIsLoading(false)

    const propertiesMapped: IPropertyMapped[] = propertiesMapper(
      properties || [],
    )
    setPropertiesFiltered(propertiesMapped)
  }

  const changePropertyType = (e: any) => {
    let valueToBeSet: string[] = []
    setFilterParams((oldState) => {
      if (oldState.propertyType.includes(e.target.value)) {
        valueToBeSet = oldState.propertyType.filter(
          (type) => type !== e.target.value,
        )
      } else {
        valueToBeSet = [...oldState.propertyType, e.target.value]
      }
      return {
        ...oldState,
        propertyType: valueToBeSet,
      }
    })
  }

  useEffect(() => {
    if (!router.isReady) return

    setCenter({
      lat: Number(router.query.lat),
      lng: Number(router.query.lng),
    })
  }, [router.isReady])

  useEffect(() => {
    if (bounds?.ne.lat && bounds?.sw.lat) {
      searchProperties()
    }
  }, [bounds])

  return (
    <>
      <Head>
        <title>Corretora - Busca</title>
      </Head>
      <S.Wrapper>
        <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
          <S.ModalWrapper>
            <S.ModalTabs>
              <input
                type="radio"
                checked={filterParams.acquisitionType === 'rent'}
                id="rent"
                name="acquisitionType"
                value="rent"
                onChange={() =>
                  setFilterParams((oldState) => ({
                    ...oldState,
                    acquisitionType: 'rent',
                  }))
                }
              />
              <label htmlFor="rent">Alugar</label>

              <input
                type="radio"
                checked={filterParams.acquisitionType === 'buy'}
                id="buy"
                name="acquisitionType"
                value="buy"
                onChange={() =>
                  setFilterParams((oldState) => ({
                    ...oldState,
                    acquisitionType: 'buy',
                  }))
                }
              />
              <label htmlFor="buy">Comprar</label>
            </S.ModalTabs>
            <S.FilterWrapper>
              {filterParams.acquisitionType === 'rent' ? (
                <>
                  <h3>Tipo de imóvel</h3>
                  <S.PropertyTypeInputs>
                    {Array.from(typeMap.keys()).map((type) => (
                      <S.InputRadio key={type}>
                        <input
                          type="radio"
                          checked={filterParams.propertyType.includes(type)}
                          id={type}
                          value={type}
                          onChange={() => ({})}
                          onClick={changePropertyType}
                        />
                        <label htmlFor={type}>{typeMap.get(type)}</label>
                      </S.InputRadio>
                    ))}
                  </S.PropertyTypeInputs>
                </>
              ) : (
                <>
                  <h3>Tipo de imóvel</h3>
                  <S.PropertyTypeInputs>
                    {Array.from(typeMap.keys()).map((type) => (
                      <S.InputRadio key={type}>
                        <input
                          type="radio"
                          checked={filterParams.propertyType.includes(type)}
                          id={type}
                          value={type}
                          onChange={() => ({})}
                          onClick={changePropertyType}
                        />
                        <label htmlFor={type}>{typeMap.get(type)}</label>
                      </S.InputRadio>
                    ))}
                  </S.PropertyTypeInputs>
                </>
              )}
            </S.FilterWrapper>
            <S.ModalFooter>
              <S.ClearFilterBtn
                type="button"
                onClick={() => setFilterParams(defaultParams)}
              >
                Limpar filtros
              </S.ClearFilterBtn>
              <S.ModalBtn onClick={searchProperties}>Filtrar</S.ModalBtn>
            </S.ModalFooter>
          </S.ModalWrapper>
        </Modal>
        <S.ShelfSearch>
          <S.HeaderShelfSearch>
            <nav>
              <ul>
                <li>
                  <Link href="/">
                    <span>Início</span>
                  </Link>
                </li>
                <li>&gt;</li>
                <li>{router.query.location}</li>
              </ul>
            </nav>
            <S.FilterBtn onClick={() => setShowModal(true)}>
              Filtrar
            </S.FilterBtn>
          </S.HeaderShelfSearch>
          <S.Shelf>
            {isLoading ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : (
              <>
                {propertiesFiltered?.map((property, index) => (
                  <Card key={index} property={property} />
                ))}
              </>
            )}
          </S.Shelf>
        </S.ShelfSearch>
        <S.MapSide>
          {center && propertiesFiltered ? (
            <Map
              center={center}
              getBounds={({ sw, ne }: IBounds) => {
                setBounds({ sw, ne })
              }}
            >
              <MarkerClusterer>
                {(clusterer) => (
                  <>
                    {propertiesFiltered.map((p, index) => (
                      <Marker
                        key={index}
                        position={{ lat: p.lat, lng: p.lng }}
                        clusterer={clusterer}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>
            </Map>
          ) : (
            <>Loading...</>
          )}
        </S.MapSide>
      </S.Wrapper>
    </>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
