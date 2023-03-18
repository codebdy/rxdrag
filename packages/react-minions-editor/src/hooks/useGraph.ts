import { useContext } from "react";
import { GraphContext } from "../interfaces/state";

export function useGraph() {
  return useContext(GraphContext)
}