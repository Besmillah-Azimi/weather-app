import { useContext } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import WeatherDashboard from "./tabs/Overview";
import { TabContext } from "./contexts/TabContext";
import GlassSearch from "./Search";
import Hourly from "./tabs/Hourly";
import SevenDayWeather from "./tabs/7days";

export default function () {
  const { activeTab } = useContext(TabContext);
  return (
    <div className="md:flex w-screen h-screen overflow-auto">
      <div>
        <Sidebar />
      </div>

      <div className="w-full overflow-auto flex flex-col">
        <GlassSearch />
        {activeTab === "overview" && <WeatherDashboard />}
        {activeTab === "hourly" && <Hourly />}
        {activeTab === "6 days" && <SevenDayWeather />}
      </div>
    </div>
  );
}
