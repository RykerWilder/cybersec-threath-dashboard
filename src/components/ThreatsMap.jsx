import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ThreatMap = () => {

  const getColorBySeverity = (severity) => {
    switch (severity) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Cyber Threat Map</h2>
        <button
          onClick={fetchThreats}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Caricamento..." : "Aggiorna Dati"}
        </button>
      </div>

      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-4">
          <h3 className="font-bold text-lg mb-2">Errore nel caricamento dei dati</h3>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Assicurati di aver inserito una API key valida di AlienVault OTX.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-[500px] bg-gray-800 rounded-lg">
          <div className="text-white text-xl">Caricamento minacce...</div>
        </div>
      ) : threats.length > 0 ? (
        <>
          <div className="bg-gray-800 p-3 rounded-lg mb-2 text-white">
            <strong>Minacce rilevate:</strong> {threats.length}
          </div>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "500px", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a>'
            />
            {threats.map((threat) => (
              <CircleMarker
                key={threat.id}
                center={[threat.lat, threat.lng]}
                radius={10}
                color={getColorBySeverity(threat.severity)}
                fillColor={getColorBySeverity(threat.severity)}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="p-2">
                    <p className="font-bold mb-2">{threat.description}</p>
                    <p>
                      <strong>Type:</strong> {threat.type}
                    </p>
                    <p>
                      <strong>Severity:</strong> {threat.severity}
                    </p>
                    <p>
                      <strong>Country:</strong> {threat.country}
                    </p>
                    <p className="text-sm text-gray-600">
                      {threat.lat.toFixed(4)}, {threat.lng.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </>
      ) : null}
    </div>
  );
};

export default ThreatMap;