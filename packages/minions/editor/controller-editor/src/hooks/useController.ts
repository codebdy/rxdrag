import { useContext } from "react";
import { ControllerMetaContext } from "../contexts";

export function useControllerMeta(){
  return useContext(ControllerMetaContext)
}