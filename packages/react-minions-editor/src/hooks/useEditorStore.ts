import { useContext } from "react";
import { ReacionsEditorStoreContext } from "../interfaces/state";

export function useEditorStore(){
  return useContext(ReacionsEditorStoreContext)
}