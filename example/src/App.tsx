import React, { useState, ChangeEvent } from "react";
import { Map } from "./Map";
import { MapWithMarker } from "./MapWithMarker";

export const App: React.FC = () => {
  const [val, setVal] = useState(1);
  const [visible, setVisible] = useState(true);
  console.log("render App");

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>toggle visibility</button>
      <input
        value={val}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setVal(parseInt(event.target.value))
        }
      />
      {visible && <Map />}
      {visible && <MapWithMarker />}
    </div>
  );
};
