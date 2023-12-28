"use client";
import { Map as Component } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import DeckGL from "@deck.gl/react/typed";
import { PolygonLayer } from "@deck.gl/layers/typed";

type Props = {
  data: any;
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

  const layer = new PolygonLayer({
    id: "polygon-layer",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: (d) => d.contour,
    getElevation: (d) => d.population / d.area / 10,
    getFillColor: (d) => [d.population / d.area / 60, 140, 0],
    getLineColor: [80, 80, 80],
    getLineWidth: 1,
  });

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return (
    <APIProvider apiKey={API_KEY}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[layer]}
      >
        <Component
          zoom={zoom}
          center={{ lat: centroid[1], lng: centroid[0] }}
          disableDefaultUI={true}
          styles={styles}
        />
      </DeckGL>
    </APIProvider>
  );
};

export default Map;
