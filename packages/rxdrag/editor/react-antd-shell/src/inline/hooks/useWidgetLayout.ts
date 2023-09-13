import { useContext } from "react";
import { WidgetsContext } from "../contexts";

export function useWidgetLayout(name?: string) {
  return useContext(WidgetsContext)?.widgets?.[name || ""]
}