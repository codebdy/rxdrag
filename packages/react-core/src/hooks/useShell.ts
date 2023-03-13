import { IDesignerEngine } from "core";
import { useContext } from "react";
import { DesignerEngineContext } from "core-react/contexts";

export function useShell(){
  const designer = useContext<IDesignerEngine|undefined>(DesignerEngineContext)
  return designer?.getShell();
}