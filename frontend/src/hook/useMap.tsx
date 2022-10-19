import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Geolocation from "ol/Geolocation";
import Point from "ol/geom/Point";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import VectorSource from "ol/source/Vector";

function useMap(domRef) {
  const view = new View({
    center: [0, 0],
    zoom: 2,
  });

  const geolocation = new Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection: view.getProjection(),
  });

  const accuracyFeature = new Feature();
  geolocation.on("change:accuracyGeometry", function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: "#3399CC",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    })
  );

  const init: Map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: view,
  });

  new VectorLayer({
    map: init,
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
  });

  useEffect(() => {
    geolocation.setTracking(true);
    const setGeoPos = () => {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    };
    geolocation.on("change:position", setGeoPos);

    if (domRef.current) init.setTarget(domRef.current);

    return () => {
      geolocation.removeEventListener("change:position", setGeoPos);
    };
  }, [domRef.current]);

  return init;
}

export default useMap;
