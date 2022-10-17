import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import React from "react";

const MapComponent = React.forwardRef((props, ref) => {
  React.useEffect(() => {
    const init = new Map({
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

    init.setTarget(ref.current);

    props.setMapObj(init);
  }, []);

  return (
    <>
      <div id="map" ref={ref}>
        {props.children}
      </div>
    </>
  );
});

export default MapComponent;
