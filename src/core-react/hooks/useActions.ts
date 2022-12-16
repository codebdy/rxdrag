import { IDesignerEngine } from "core";
import { useContext } from "react";
import { DesignerEngineContext } from "core-react/contexts";

export function useActions(){
  const designer = useContext<IDesignerEngine|undefined>(DesignerEngineContext)
  return designer?.getActions();
}