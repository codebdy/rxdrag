import { useContext } from "react"
import { MaterialsContext } from "../contexts";

export function useMaterials(){
  return useContext(MaterialsContext)
}