import React from "react";
import { useGoogleMaps } from "react-hook-google-maps";

// based on https://developers.google.com/maps/documentation/javascript/adding-a-google-map
const uluru = { lat: -25.344, lng: 131.036 };

export const MapWithMarker = React.memo(function Map() {
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
    {
      zoom: 4,
      center: uluru
    }
  );
  console.log("render MapWithMarkers");

  if (map) {
    // execute when map object is ready
    new google.maps.Marker({ position: uluru, map });
  }

  return (
    <div>
      <span>
        Example from{" "}
        <a href="https://developers.google.com/maps/documentation/javascript/adding-a-google-map">
          https://developers.google.com/maps/documentation/javascript/adding-a-google-map
        </a>
      </span>
      <div ref={ref} style={{ width: 400, height: 300 }} />
    </div>
  );
});
