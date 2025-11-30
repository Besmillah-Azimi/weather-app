import App from "./App.jsx";
import WeatherBackground from "./style_components/Bg.jsx";
import LiquidGlass from "liquid-glass-react";
export default function Container() {
  return (
    <>
      {/* <LiquidGlass className="w-[300px] h-[200px] fixed border-white  left-90 mx-auto">
        <h2>Hello Liquid Glass!</h2>
        <p>This content is inside the glass effect.</p>
      </LiquidGlass> */}
      <App />
      <WeatherBackground />
    </>
  );
}
