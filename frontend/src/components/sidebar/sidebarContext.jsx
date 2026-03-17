import { createContext, useContext, useState } from 'react';

 export const SidebarContext = createContext();

// Provider: owns the state and shares it
export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Hook: any component uses this to read the state
export const useSidebar = () => useContext(SidebarContext);