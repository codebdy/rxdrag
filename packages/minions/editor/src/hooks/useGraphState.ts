import { useContext } from "react";
import { GraphContext } from "../contexts";

export function useGraphState() {
  return useContext(GraphContext)
}