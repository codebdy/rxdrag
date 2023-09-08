import { useContext } from "react";
import { CanvasConfigContext } from "../contexts";

export function useCanvasConfig() {
  return useContext(CanvasConfigContext)
}