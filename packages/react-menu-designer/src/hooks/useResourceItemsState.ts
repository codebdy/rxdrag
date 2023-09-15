import { useContext } from "react";
import { ResourceItemsContext } from "../contexts";

export function useResourceItemsState() {
  return useContext(ResourceItemsContext)
}