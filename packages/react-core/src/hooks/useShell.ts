import { IDesignerEngine } from "@rxdrag/core";
import { useContext } from "react";
import { DesignerEngineContext } from "../contexts";

export function useShell(){
  const designer = useContext<IDesignerEngine|undefined>(DesignerEngineContext)
  return designer?.getShell();
}