import { useContext } from "react";
import { ThemeTokenContext } from "../contexts";

export function useThemeToken (){
  return useContext(ThemeTokenContext)
}