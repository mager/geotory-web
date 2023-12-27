"use client";
import { Map as Component } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import DeckGL from "@deck.gl/react/typed";
import { PolygonLayer } from "@deck.gl/layers/typed";
import type { FeatureCollection } from "geojson";

type Props = {
  data: FeatureCollection;
  centroid: number[];
  theme: string;
  zoom: number;
};

const Map = ({ centroid, data, theme, zoom = 3 }: Props) => {
  const styles = theme ? require(`./map-styles/${theme}`).default : null;

  const INITIAL_VIEW_STATE = {
    longitude: centroid[0],
    latitude: centroid[1],
    zoom,
    pitch: 0,
    bearing: 0,
  };
  const layers = [] as PolygonLayer[];
  // Create layers of PolygonLayer for each feature in the FeatureCollection
  data.features.forEach((feature) => {
    layers.push(
      new PolygonLayer({
        id: `polygon-layer-${feature?.properties?.id}`,
        getPolygon: (d) => d.geometry.coordinates,
        getFillColor: [255, 0, 0, 255],
        // getLineColor should be red
        getLineColor: [255, 0, 0, 255],
        getLineWidth: 3,
      }),
    );
  });
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return (
    <APIProvider apiKey={API_KEY}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Component
          zoom={zoom}
          center={{ lat: centroid[1], lng: centroid[0] }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          styles={styles}
        />
      </DeckGL>
    </APIProvider>
  );
};

export default Map;
