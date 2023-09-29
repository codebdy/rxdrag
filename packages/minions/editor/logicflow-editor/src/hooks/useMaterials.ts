import { useContext } from "react";
import { MaterialsContext } from "../contexts";

export function useMaterials(){
  const [materials] = useContext(MaterialsContext)

  return materials
}