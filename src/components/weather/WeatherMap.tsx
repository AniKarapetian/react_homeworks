import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LeafletMouseEvent } from "leaflet";
type MapProps = {
  data: {
    lat: number;
    lon: number;
    city: string;
    onMapClick: (event: LeafletMouseEvent) => void;
  };
};

const WeatherMap: FC<MapProps> = ({ data }) => {
  const mapRef = useRef(null);
  const customIcon = L.icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    const mapContainer = mapRef.current as any;
    mapContainer.style.cursor = "pointer";
    const map = L.map(mapContainer).setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );
    map.on("click", data.onMapClick);
    L.marker([data.lat, data.lon], { icon: customIcon }).addTo(map);

    map.setView([data.lat, data.lon], 10);

    return () => {
      map.off("click", data.onMapClick);
      map.remove();
    };
  }, [data]);

  return <div ref={mapRef} style={{ height: "300px" }} />;
};

export default WeatherMap;
