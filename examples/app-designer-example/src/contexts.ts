import { createContext, useContext } from "react";
import { IApp, IAppFrontend, ThemeMode } from "./interfaces";

export const AppContext = createContext<IApp | undefined>(undefined)
export const AppThemeModeContext = createContext<ThemeMode | undefined>(undefined)
export const AppFrontendContext = createContext<IAppFrontend | undefined>(undefined)

export function useAppThemeMode() {
  return useContext(AppThemeModeContext)
}