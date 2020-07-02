import React, { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyles = {
  width: "80vw",
  height: "80vh"
};
const center = {
  lat: 21.003444,
  lng: 105.843492
};

const GoogleMapStoreOfSalesman = ({ listStore }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDl7WbBCp1OxwSDZWtTkdQluKYuj47qgdE",
    libraries
  });
  const mapRef = useRef();
  const firstStore = Object.values(listStore)[0]
    ? Object.values(listStore)[0]
    : null;

  useEffect(() => {
    if (mapRef.current && firstStore) {
      panTo({ lat: firstStore.latitude, lng: firstStore.longitude });
    }
  }, [listStore]);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading  Maps";

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  };

  const onMapLoad = map => {
    mapRef.current = map;
    if (firstStore) {
      panTo({ lat: firstStore.latitude, lng: firstStore.longitude });
    }
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={13}
        center={center}
        onLoad={onMapLoad}
      >
        {Object.values(listStore).map(store => (
          <Marker
            key={store.id}
            position={{ lat: store.latitude, lng: store.longitude }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapStoreOfSalesman;
