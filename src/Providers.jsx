import LanguageProvider from "./contexts/LanguageContext";
import LocationProvider from "./contexts/LocationContext";
import TabProvider from "./contexts/TabContext";
import TranslateProvider from "./contexts/Translate";
import WeatherProvider from "./contexts/WeatherContext";

export default function Providers({ children }) {
  return (
    <LocationProvider>
      <LanguageProvider>
        <WeatherProvider>
          <TabProvider>
            <TranslateProvider>{children}</TranslateProvider>
          </TabProvider>
        </WeatherProvider>
      </LanguageProvider>
    </LocationProvider>
  );
}
