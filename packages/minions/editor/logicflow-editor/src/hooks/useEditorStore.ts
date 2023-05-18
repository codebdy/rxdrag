import { useContext } from "react";
import { LogicFlowEditorStoreContext } from "../contexts";

export function useEditorStore(){
  return useContext(LogicFlowEditorStoreContext)
}