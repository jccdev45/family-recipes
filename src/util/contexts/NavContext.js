import { createContext, useContext } from "react";
import { useToggle } from "../hooks/useToggle";

const NavContext = createContext();

export function useNav() {
  return useContext(NavContext);
}

export function NavProvider({ children }) {
  const [isOpen, setIsOpen] = useToggle();

  const value = {
    isOpen,
    setIsOpen,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
