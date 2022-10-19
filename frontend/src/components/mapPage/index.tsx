import React, { useRef, useState } from "react";
import useMap from "../../hook/useMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function MapPage() {
  const mapRef = useRef(null);
  const mapObj = useMap(mapRef);
  const user = useSelector((s: RootState) => s.user);

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
    <>
      <Box style={{ display: "flex", height: 100, alignItems: "flex-end", gap: 10 }}>
        <Typography
          variant="h5"
          component="p"
          color={"black"}
        >{`name: ${user.name}`}</Typography>
        <Typography
          variant="h5"
          component="p"
          color={"black"}
        >{`email: ${user.email}`}</Typography>
      </Box>
      <div
        style={{
          position: "relative",
          zIndex: 100,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            right: 0,
            top: 5,
            display: "flex",
            gap: 10,
          }}
        >
          <button onClick={() => zoomIn()} id={"zoom-in"}>
            Zoom-In
          </button>
          <button onClick={() => zoomOut()} id={"zoom-out"}>
            Zoom-Out
          </button>
        </div>
        <div
          ref={mapRef}
          id="map"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 90,
          }}
        ></div>
      </div>
    </>
  );
}

export default MapPage;
