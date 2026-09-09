import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useLocalStorageState(
    false,
    "isSidebarCollapsed",
  );

  function toggleSidebar() {
    setIsCollapsed((collapsed) => !collapsed);
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("SidebarContext was used outside SidebarProvider");
  }
  return context;
}

export { SidebarProvider, useSidebar };
