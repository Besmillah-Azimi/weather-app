import LanguageProvider from "./contexts/LanguageContext";
import LocationProvider from "./contexts/LocationContext";
import TabProvider from "./contexts/TabContext";
import WeatherProvider from "./contexts/WeatherContext";

// fix browser Geolocation Tomorrow.

export default function Providers({ children }) {
  return (
    <LocationProvider>
      <LanguageProvider>
        <WeatherProvider>
          <TabProvider>{children}</TabProvider>
        </WeatherProvider>
      </LanguageProvider>
    </LocationProvider>
  );
}
