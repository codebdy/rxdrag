import { useContext } from "react";
import { AppThemeModeContext } from "../contexts";

export function useAppThemeMode() {
  return useContext(AppThemeModeContext)
}