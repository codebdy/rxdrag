import { useContext } from "react";
import { OverIdContext } from "../contexts";

export function useOverIdState() {
  return useContext(OverIdContext)
}