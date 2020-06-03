import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";

import { formatRelative } from "date-fns";
import { Button, makeStyles, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  input: {
    width: "250px",
    borderRadius: "25px",
    marginTop: "10px"
  },
  iconButton: {
    padding: 10,
    position: "absolute",
    top: "58%",
    transform: "translateY(-50%)"
  },
  liItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee"
    }
  }
}));

const libraries = ["places"];
const mapContainerStyles = {
  width: "80vw",
  height: "80vh"
};
const center = {
  lat: 21.003444,
  lng: 105.843492
};

const GoogleMapCustom = ({ setAddr, setCoordinates, setOpenMap }) => {
  const classes = useStyles();
  const [marker, setMarker] = useState(null);
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDl7WbBCp1OxwSDZWtTkdQluKYuj47qgdE",
    libraries
  });
  const mapRef = useRef();

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading  Maps";

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  };

  const onMapLoad = map => (mapRef.current = map);

  return (
    <div>
      <Search panTo={panTo} setAddr={setAddr} />

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
          setOpenInfoWindow(false);
        }}
        onLoad={onMapLoad}
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
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCoordinates(marker);
            setOpenMap(false);
          }}
        >
          Choose
        </Button>
      </div>
    </div>
  );
};

const Search = ({ panTo, setAddr }) => {
  const classes = useStyles();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 21.003444, lng: () => 105.843492 },
      radius: 100 * 1000
    }
  });
  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setAddr(description);
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        panTo({ lat, lng });
      })
      .catch(error => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li
          key={id}
          onClick={handleSelect(suggestion)}
          className={classes.liItem}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  const displayData = data.map(d => ({
    main: d.structured_formatting.main_text,
    secondary: d.structured_formatting.secondary_text
  }));

  console.log("display data", displayData);

  return (
    <div>
      <div>
        <TextField
          value={value}
          onChange={handleInput}
          disabled={!ready}
          label="Search Location"
          className={classes.input}
          variant="outlined"
        />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={() => setValue("")}
        >
          <ClearIcon />
        </IconButton>
      </div>
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default GoogleMapCustom;
