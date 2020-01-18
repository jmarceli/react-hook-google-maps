# react-hook-google-maps

> React useGoogleMaps hook

[![NPM](https://img.shields.io/npm/v/react-hook-google-maps.svg)](https://www.npmjs.com/package/react-hook-google-maps)

Easiest way to use Google Maps in your React application.

For Google API documentation please check https://developers.google.com/maps/documentation/javascript/reference

## Install

```bash
npm install --save react-hook-google-maps
```

## Usage

```jsx
import * as React from "react";

import { useGoogleMaps } from "react-hook-google-maps";

class Example extends React.Component {
  render() {
    const { ref, map, google } = useGoogleMaps(
      // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
      "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
      // NOTE: even if you change options later
      {
        center: { lat: 0, lng: 0 },
        zoom: 3
      }
    );
    console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
    console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
    <div ref={ref} style={{ width: 400, height: 300 }} />;
  }
}
```

## Example

<iframe
     src="https://codesandbox.io/embed/priceless-shaw-o6e7x?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="priceless-shaw-o6e7x"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>

## License

MIT

## Author

Jan Grzegorowski [jmarceli](https://github.com/jmarceli)
