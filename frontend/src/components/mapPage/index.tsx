import React, { useRef, useState } from "react";
import useMap from "../../hook/useMap";

function MapPage() {
  const mapRef = useRef(null);
  const mapObj = useMap(mapRef);

  function zoomIn() {
    if (!mapObj) return;

    const view = mapObj.getView();
    const zoom = view.getZoom();

    if (zoom) view.setZoom(zoom + 1);
  }

  function zoomOut() {
    if (!mapObj) return;

    const view = mapObj.getView();
    const zoom = view.getZoom();

    if (zoom) view.setZoom(zoom - 1);
  }

  return (
    <div
      className="App"
      style={{
        position: "relative",
        zIndex: 100,
        minHeight: "100vh",
      }}
    >
      <div ref={mapRef} id="map">
        <button onClick={() => zoomIn()} id={"zoom-in"}>
          Zoom-In
        </button>
        <button onClick={() => zoomOut()} id={"zoom-out"}>
          Zoom-Out
        </button>
      </div>
    </div>
  );
}

export default MapPage;
