import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useNavigate, useSearchParams } from "react-router-dom";

function Map({ markerLocation }) {
  const [position, setPosition] = useState([35.81, 50.89]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) {
      return setPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={position} />
        <LocationMarker />
        {markerLocation.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function LocationMarker() {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      // console.log(e.latlng);
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}
