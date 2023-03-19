import { IDesignerEngine } from "@rxdrag/core";
import { DesignerEngineContext } from "../contexts";
import { useContext } from "react";

export function useActions(){
  const designer = useContext<IDesignerEngine|undefined>(DesignerEngineContext)
  return designer?.getActions();
}