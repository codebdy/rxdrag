import { useContext } from "react";
import { ControllerEditorContext } from "../contexts";

export function useAllControllerMetas(){
  return useContext(ControllerEditorContext)?.controllers
}