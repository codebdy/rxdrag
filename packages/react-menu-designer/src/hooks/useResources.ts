import { useContext } from "react";
import { ResourcesContext } from "../contexts";

export function useResources() {
  return useContext(ResourcesContext)
}