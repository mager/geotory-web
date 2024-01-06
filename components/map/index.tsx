"use client";
import React, { Suspense } from "react";
import type { GeoJSON } from "geojson";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Text from "../shared/text";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

type Props = {
  geojsonData: GeoJSON;
  centroid: [number, number];
  zoom: number;
};

const Map = ({ centroid, geojsonData, zoom }: Props) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    version: "weekly",
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
                map.data.addListener(
                  "click",
                  (event: google.maps.Data.MouseEvent) => {
                    // TODO: Get property keys
                    console.log(event.feature);
                  },
                );
              } catch (e) {
                console.error(e);
              }
            }
          }}
        ></GoogleMap>
      )}
    </Suspense>
  );
};

export default Map;
