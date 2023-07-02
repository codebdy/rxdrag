import { useContext } from "react";
import { GraphContext } from "../contexts";

export function useGraph() {
  return useContext(GraphContext)
}