import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // ← Replace with your own icon URL
  iconSize: [30, 42], // Adjust size as needed
  iconAnchor: [15, 42], // Point of icon corresponding to marker location
  popupAnchor: [0, -36], // Position of popup relative to icon
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// 🎯 Helper to move map view
function ChangeMapView({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo([coords.latitude, coords.longitude], 10, {
        duration: 1.5, // seconds
        easeLinearity: 0.25,
      });
    }
  }, [coords, map]);

  return null;
}
const DistrictMap = ({ targetCoords }) => {
  const warehouse = useLoaderData();

  return (
    <div className="w-full h-[500px] mt-10">
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl shadow-md"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {targetCoords && <ChangeMapView coords={targetCoords} />}

        {warehouse.map((location, idx) => (
          <Marker
            key={idx}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>{location.district}</strong> <br />
              {location.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
