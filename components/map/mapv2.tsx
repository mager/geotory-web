"use client";
import React, { Suspense } from "react";
import type { GeoJSON } from "geojson";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "400px",
  height: "300px",
};

const MapV2 = ({ geojsonData }: { geojsonData: GeoJSON }) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 40.7484, lng: -73.9857 }}
          zoom={11}
          onLoad={(map) => {
            if (geojsonData) {
              map.data.addGeoJson(geojsonData);
            }
            console.log(geojsonData);
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

export default MapV2;
