import React, { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { connect } from "react-redux";
import { fetchAllCustomerStore } from "../../actions/facility";
import { createSelector } from "reselect";

const libraries = ["places"];
const mapContainerStyles = {
  width: "80vw",
  height: "80vh"
};
const center = {
  lat: 21.003444,
  lng: 105.843492
};

const GoogleMapAllStore = ({
  fetchAllCustomerStore,
  allCustomerStore,
  selectedStore
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDl7WbBCp1OxwSDZWtTkdQluKYuj47qgdE",
    libraries
  });
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && selectedStore) {
      panTo({ lat: selectedStore.latitude, lng: selectedStore.longitude });
    }
  }, [selectedStore]);

  useEffect(() => {
    fetchAllCustomerStore();
  }, []);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading  Maps";

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  };

  const onMapLoad = map => {
    mapRef.current = map;
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={13}
        center={center}
        onLoad={onMapLoad}
      >
        {Object.values(allCustomerStore).map(store => (
          <Marker
            key={store.id}
            position={{ lat: store.latitude, lng: store.longitude }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

const mapState = createSelector(
  state => state.facility.allCustomerStore,
  allCustomerStore => ({ allCustomerStore })
);

const mapDispatch = dispatch => ({
  fetchAllCustomerStore: () => dispatch(fetchAllCustomerStore())
});

export default connect(mapState, mapDispatch)(GoogleMapAllStore);
