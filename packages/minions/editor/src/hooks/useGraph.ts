import { useContext } from "react";
import { GraphContext } from "../contexts";

export function useGraph() {
  const [graph] = useContext(GraphContext)
  return graph
}