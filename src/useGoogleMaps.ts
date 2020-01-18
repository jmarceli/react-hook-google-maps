import { useState, useEffect, useRef } from "react";
import { useGoogleMapsApi } from "./useGoogleMapsApi";

export function useGoogleMaps(apiKey: string, options: google.maps.MapOptions) {
  const google = useGoogleMapsApi(apiKey);
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!google || !ref) {
      return;
    }
    setMap(new google.maps.Map(ref.current, options));
  }, [google, ref]);

  return { ref, map, google };
}
