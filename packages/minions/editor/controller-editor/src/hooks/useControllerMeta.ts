import { useContext } from "react";
import { ControllerEditorContext } from "../contexts";

export function useControllerMeta(){
  return useContext(ControllerEditorContext).controller
}