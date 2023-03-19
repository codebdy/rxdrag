import { useContext } from "react";
import { MaterialsContext } from "../context";

export function useMaterialCategories() {
  return useContext(MaterialsContext)
}