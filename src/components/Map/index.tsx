import React, { CSSProperties } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Script from "next/script";
// import { useGoogleMap } from "@react-google-maps/api";

export interface IBounds {
  sw: {
    lat?: number;
    lng?: number;
  };
  ne: {
    lat?: number;
    lng?: number;
  };
}

interface IMapProps {
  center: {
    lat: number;
    lng: number;
  };
  children?: React.ReactElement;
  getBounds?: (bounds: IBounds) => void;
}

function Map({ center, children, getBounds }: IMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBEtW0PTowEOEdwSD-FwodQ0Ig_l_-Jt4c",
  });

  const containerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  const [map, setMap] = React.useState<google.maps.Map>();

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const sw = {
      lat: center.lat - 0.05,
      lng: center.lng - 0.05,
    };
    const ne = {
      lat: center.lat + 0.05,
      lng: center.lng + 0.05,
    };
    const bounds = new window.google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds);
    getBoundsOnMap();
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap({} as google.maps.Map);
  }, []);

  const getBoundsOnMap = () => {
    getBounds &&
      getBounds({
        sw: {
          lat: map?.getBounds()?.getSouthWest().lat(),
          lng: map?.getBounds()?.getSouthWest().lng(),
        },
        ne: {
          lat: map?.getBounds()?.getNorthEast().lat(),
          lng: map?.getBounds()?.getNorthEast().lng(),
        },
      });
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onZoomChanged={getBoundsOnMap}
        onDragEnd={getBoundsOnMap}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>{children}</>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
