"use client";
import React, { Suspense } from "react";
import type { GeoJSON } from "geojson";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
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

  return (
    <Suspense fallback={<Text>Loading map...</Text>}>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: centroid[1], lng: centroid[0] }}
          zoom={zoom}
          onLoad={(map) => {
            if (geojsonData) {
              map.data.addGeoJson(geojsonData);
            }
          }}
        >
          {/* Render GeoJSON features using Polygon components */}
        </GoogleMap>
      </LoadScript>
    </Suspense>
  );
};

export const config = {
  amp: true, // Optional for AMP compatibility
};

export default Map;
