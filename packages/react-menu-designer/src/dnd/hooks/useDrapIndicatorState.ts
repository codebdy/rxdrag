import { useContext } from "react";
import { DropIndicatorContext } from "../contexts";

export function useDrapIndicatorState() {
  return useContext(DropIndicatorContext)
}