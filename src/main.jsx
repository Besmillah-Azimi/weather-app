import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./Providers.jsx";
import Container from "./Container.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <Container />
    </Providers>
  </StrictMode>
);
