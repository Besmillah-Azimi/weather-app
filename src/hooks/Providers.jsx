import LanguageProvider from "./UseLanguage";
import LocationProvider from "./UseLocation";
import TabProvider from "./UseTab";
import WeatherProvider from "./UseWeather";

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
