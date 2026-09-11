import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useLocalStorageState(
    false,
    "isSidebarCollapsed",
  );

  // Mobile off-canvas drawer — separate from the desktop collapse state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleSidebar() {
    setIsCollapsed((collapsed) => !collapsed);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((open) => !open);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
      }}
    >
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
