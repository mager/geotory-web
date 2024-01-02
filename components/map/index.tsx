"use client";
import React, { Suspense } from "react";
import type { GeoJSON } from "geojson";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import Text from "../shared/text";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

type Props = {
  geojsonData: GeoJSON;
  centroid: [number, number];
  zoom: number;
};

const Map = ({ centroid, geojsonData, zoom }: Props) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["geometry", "drawing"],
  });

  return (
    <Suspense fallback={<Text>Loading map...</Text>}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: centroid[1], lng: centroid[0] }}
          zoom={zoom}
          onLoad={(map) => {
            if (geojsonData) {
              try {
                map.data.addGeoJson(geojsonData);
              } catch (e) {
                console.error(e);
              }
            }
          }}
        >
          {/* Render GeoJSON features using Polygon components */}
        </GoogleMap>
      )}
    </Suspense>
  );
};

export const config = {
  amp: true, // Optional for AMP compatibility
};

export default Map;
