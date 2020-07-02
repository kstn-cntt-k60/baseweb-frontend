import React, { useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  SymbolPath
} from "@react-google-maps/api";
import { connect } from "react-redux";
import {
  fetchAllCustomerStore,
  fetchPairStoreSalesman
} from "../../../actions/facility";
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

const GoogleMapVisualize = ({
  fetchAllCustomerStore,
  allCustomerStore,
  fetchPairStoreSalesman,
  listStore
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDl7WbBCp1OxwSDZWtTkdQluKYuj47qgdE",
    libraries
  });
  const mapRef = useRef();

  //   useEffect(() => {
  //     if (mapRef.current && selectedStore) {
  //       panTo({ lat: selectedStore.latitude, lng: selectedStore.longitude });
  //     }
  //   }, [selectedStore]);

  useEffect(() => {
    fetchAllCustomerStore();
    fetchPairStoreSalesman();
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

  console.log("all stores", allCustomerStore);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={9}
        center={center}
        onLoad={onMapLoad}
      >
        {Object.values(allCustomerStore).map(store => (
          <Marker
            key={store.id}
            position={{ lat: store.latitude, lng: store.longitude }}
            icon={{
              url: `https://raw.githubusercontent.com/TungCaoBk97/baseweb-report/master/Slide/marker-icon/color-${store.color}.png`
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

const colors = {
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
  10: "10",
  11: "11",
  12: "12",
  13: "13",
  14: "14",
  15: "15",
  16: "16",
  17: "17",
  18: "18",
  19: "19"
};

const computeAllCustomerStores = (allCustomerStore, pairs) => {
  const salesmanIds = [...new Set(pairs.map(p => p.salesmanId))];

  const salesmanColor = {};
  salesmanIds.forEach((id, index) => {
    const color = colors[index] || "00";
    salesmanColor[id] = color;
  });

  const result = { ...allCustomerStore };

  Object.keys(result).forEach(key => {
    result[key].color = "00";
  });

  pairs.forEach(p => {
    if (result[p.customerStoreId]) {
      result[p.customerStoreId].color = salesmanColor[p.salesmanId];
    }
  });
  return result;
};

const mapState = createSelector(
  state => state.facility.allCustomerStore,
  state => state.salesroute.pairStoreSalesman,
  (allCustomerStore, pairStoreSalesman) => ({
    allCustomerStore: computeAllCustomerStores(
      allCustomerStore,
      pairStoreSalesman
    )
  })
);

const mapDispatch = dispatch => ({
  fetchAllCustomerStore: () => dispatch(fetchAllCustomerStore()),
  fetchPairStoreSalesman: () => dispatch(fetchPairStoreSalesman())
});

export default connect(mapState, mapDispatch)(GoogleMapVisualize);
