import { useContext } from "react";
import { ReacionsEditorContext } from "../contexts";

export function useGlobalState(){
  return useContext(ReacionsEditorContext) || {}
}