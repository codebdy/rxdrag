import { useContext } from "react";
import { ControllerMetasContext } from "../contexts";

export function useAllControllerMetas(){
  return useContext(ControllerMetasContext)
}