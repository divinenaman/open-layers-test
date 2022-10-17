import "./App.css";
import React, { useEffect, useState } from "react";
import MapComponent from "./components/ol";

function App() {
  const mapRef = React.createRef();
  const [mapObj, setMapObj] = useState(null);
  const [zoom, setZoom] = useState(null);

  function zoomIn() {
    if (!mapObj) return;

    const view = mapObj.getView();
    const zoom = view.getZoom();

    console.log({ zoom });

    view.setZoom(zoom + 1);
  }

  function zoomOut() {
    if (!mapObj) return;

    const view = mapObj.getView();
    const zoom = view.getZoom();

    console.log({ zoom });

    view.setZoom(zoom - 1);
  }

  useEffect(() => {
    if (zoom) {
      if (zoom == "out") zoomOut();
      else zoomIn();
    }
  }, [zoom]);

  return (
    <div
      className="App"
      style={{
        position: "relative",
        zIndex: 100,
        minHeight: "100vh",
      }}
    >
      <MapComponent ref={mapRef} setMapObj={setMapObj}>
        <button onClick={() => setZoom("in")} id={"zoom-in"}>
          Zoom-In
        </button>
        <button onClick={() => setZoom("out")} id={"zoom-out"}>
          Zoom-Out
        </button>
      </MapComponent>
    </div>
  );
}

export default App;
