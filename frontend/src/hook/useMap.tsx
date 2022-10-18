import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import React, { useEffect } from "react";

function useMap(domRef) {
  const init: Map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });

  useEffect(() => {
    if (domRef.current) init.setTarget(domRef.current);
  }, [domRef.current]);

  return init;
}

export default useMap;
