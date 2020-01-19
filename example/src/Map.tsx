import React, { useState, useEffect } from "react";
import { useGoogleMaps } from "react-hook-google-maps";

export const Map = React.memo(function Map() {
  const [value, setValue] = useState(0);
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    },
  );
  console.log("render Map");

  useEffect(() => {
    if (!map) {
      return;
    }
    setValue(map.getZoom());

    const listener = map.addListener("zoom_changed", () => {
      setValue(map.getZoom());
    });
    return () => google.maps.event.removeListener(listener);
  }, [map, google]);

  const handleZoomUpdate = (zoomChange = 1) => {
    const nextZoom = value + zoomChange;
    if (nextZoom < 0) {
      return;
    }
    map.setZoom(nextZoom);
  };

  return (
    <div>
      <span>External zoom controls example</span>
      <div ref={ref} style={{ width: 400, height: 300 }} />
      <button onClick={() => handleZoomUpdate(1)}>Zoom In</button>
      <button onClick={() => handleZoomUpdate(-1)} disabled={value < 1}>
        Zoom Out
      </button>
      <div>{value}</div>
    </div>
  );
});
