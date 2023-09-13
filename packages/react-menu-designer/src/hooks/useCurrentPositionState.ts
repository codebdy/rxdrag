import { useContext } from "react";
import { CurrentPositionContext } from "../contexts";

export function useCurrentPositionState() {
  return useContext(CurrentPositionContext)
}