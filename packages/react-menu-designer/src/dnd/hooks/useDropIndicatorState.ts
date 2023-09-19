import { useContext } from "react";
import { DropIndicatorContext } from "../contexts";

export function useDropIndicatorState() {
  return useContext(DropIndicatorContext)
}