import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [location, setLocation] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [city, setCity] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
        console.error(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext value={{ location, city, setCity }}>
      {children}
    </LocationContext>
  );
}

export const useLocation = () => useContext(LocationContext);
