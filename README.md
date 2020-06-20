# react-hook-google-maps

> React useGoogleMaps hook

[![license](https://img.shields.io/github/license/jmarceli/react-hook-google-maps.svg)](https://opensource.org/licenses/MIT)
[![version](https://img.shields.io/npm/v/react-hook-google-maps.svg)](https://www.npmjs.com/package/react-hook-google-maps)
[![dependencies status](https://img.shields.io/david/jmarceli/react-hook-google-maps.svg)](https://david-dm.org/jmarceli/react-hook-google-maps)
[![CI build](https://img.shields.io/circleci/project/github/jmarceli/react-hook-google-maps/master.svg)](https://circleci.com/gh/jmarceli/react-hook-google-maps)
[![code coverage](https://img.shields.io/codecov/c/github/jmarceli/react-hook-google-maps.svg)](https://codecov.io/gh/jmarceli/react-hook-google-maps)

Easiest way to use Google Maps in your React application.

For Google API documentation please check https://developers.google.com/maps/documentation/javascript/reference

## Install

```bash
npm install --save react-hook-google-maps
```

## Usage examples

Check `example` dir in this repo for most up to date examples.

### Simple

```jsx
import * as React from "react";

import { useGoogleMaps } from "react-hook-google-maps";

const App = () => {
  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
    // NOTE: You should always set initial 'center' and 'zoom' values
    // even if you plan to change them later
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    },
  );
  console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
  return <div ref={ref} style={{ width: 400, height: 300 }} />;
};

export default App;
```

Check live example on CodeSandbox:

[![Edit priceless-shaw-o6e7x](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/priceless-shaw-o6e7x?fontsize=14&hidenavigation=1&theme=dark)

### Map with marker

```jsx
import React from "react";
import { useGoogleMaps } from "react-hook-google-maps";

// based on https://developers.google.com/maps/documentation/javascript/adding-a-google-map
const uluru = { lat: -25.344, lng: 131.036 };

export const MapWithMarker = React.memo(function Map() {
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
    {
      zoom: 4,
      center: uluru,
    },
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
```

Check live example on CodeSandbox:

[![Edit funny-wood-twb4t](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/funny-wood-twb4t?fontsize=14&hidenavigation=1&theme=dark)

### Map with external controls

```jsx
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
```

Check live example on CodeSandbox:

[![Edit funny-wood-twb4t](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/funny-wood-twb4t?fontsize=14&hidenavigation=1&theme=dark)

## License

[MIT](./LICENSE)

## Author

Jan Grzegorowski
