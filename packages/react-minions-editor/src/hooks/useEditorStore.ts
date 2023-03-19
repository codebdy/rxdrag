import { useContext } from "react";
import { ReacionsEditorStoreContext } from "../contexts";

export function useEditorStore(){
  return useContext(ReacionsEditorStoreContext)
}