import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const libraries = ["places"];
const mapContainerStyles = {
  width: "80vw",
  height: "80vh"
};
const center = {
  lat: 21.003444,
  lng: 105.843492
};

const GoogleMapCustom = () => {
  const [marker, setMarker] = useState(null);
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDl7WbBCp1OxwSDZWtTkdQluKYuj47qgdE",
    libraries
  });

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading  Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={15}
        center={center}
        onClick={e => {
          setMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date()
          });
        }}
      >
        {marker ? (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setOpenInfoWindow(!openInfoWindow)}
          />
        ) : null}

        {openInfoWindow ? (
          <InfoWindow position={{ lat: marker.lat, lng: marker.lng }}>
            <div>
              <h2>Your facility</h2>
              <p>At {formatRelative(marker.time, new Date())} </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <div style={{ marginTop: "10px", marginRight: "10px" }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginRight: "5px" }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Choose
        </Button>
      </div>
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(GoogleMapCustom);
