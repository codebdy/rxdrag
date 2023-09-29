import { useContext } from "react";
import { MaterialsContext } from "../contexts";

export function useMaterialsState() {
  return useContext(MaterialsContext)
}