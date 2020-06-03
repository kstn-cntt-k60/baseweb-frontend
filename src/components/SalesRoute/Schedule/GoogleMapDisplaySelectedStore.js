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

const GoogleMapDisplaySelectedStore = ({ selectedStoreMap, currentStore }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDl7WbBCp1OxwSDZWtTkdQluKYuj47qgdE",
    libraries
  });
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      panTo({ lat: currentStore.lat, lng: currentStore.long });
    }
  }, [currentStore]);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading  Maps";

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  };

  const onMapLoad = map => {
    mapRef.current = map;
    panTo({ lat: currentStore.lat, lng: currentStore.long });
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={15}
        center={center}
        onLoad={onMapLoad}
      >
        {Object.values(selectedStoreMap).map(store => (
          <Marker
            key={store.id}
            position={{ lat: store.lat, lng: store.long }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapDisplaySelectedStore;
