import { createContext, useState } from "react";

export const TabContext = createContext();

export default function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <TabContext value={{ activeTab, setActiveTab }}>{children}</TabContext>
  );
}
