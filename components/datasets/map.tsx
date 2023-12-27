"use client";
import { Map as Component } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import styles from "./bright-colors";

const Map = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return (
    <APIProvider apiKey={API_KEY}>
      <Component
        zoom={3}
        center={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        styles={styles}
      />
    </APIProvider>
  );
};

export default Map;
