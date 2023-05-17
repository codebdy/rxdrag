import { useContext } from "react";
import { MaterialsContext } from "../context";

export function useMaterials() {
  return useContext(MaterialsContext)
}