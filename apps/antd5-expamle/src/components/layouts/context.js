import { createContext, useContext } from "react";
export const LayoutContext = createContext({});
export const useLayoutParams = () => useContext(LayoutContext);
