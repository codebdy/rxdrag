import { createContext } from "react";
import { DeviceType, IApp, ThemeMode } from "./interfaces";

export const AppContext = createContext<IApp | undefined>(undefined)
export const DeviceContext = createContext<DeviceType | undefined>(undefined)
export const AppThemeModeContext = createContext<ThemeMode | undefined>(undefined)