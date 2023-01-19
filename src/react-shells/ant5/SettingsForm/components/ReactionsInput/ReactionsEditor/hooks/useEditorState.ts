import { useContext } from "react";
import { ReacionsEditorContext } from "../contexts";

export function useEditorState(){
  return useContext(ReacionsEditorContext) || {}
}