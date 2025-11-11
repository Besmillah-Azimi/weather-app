import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [city, setCity] = useState("");

  useEffect(() => {
    // Step 1: Get coordinates from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Step 2: Get city from coordinates (using BigDataCloud API)
          const res = await axios
            .get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )
            .then((res) => {
              if (res.data.city) {
                setLocation(res.data.city);
              } else if (res.data.locality) {
                setLocation(res.data.locality);
              } else {
                setLocation("Unknown location");
              }
            })
            .catch((error) => {
              setError(error);
            });
        },
        (err) => {
          console.error(err);
          setError("Permission denied or location unavailable");
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  }, []);

  return (
    <LocationContext value={{ location, city, setCity }}>
      {children}
    </LocationContext>
  );
}
