import { IDesignerEngine } from "core";
import { useContext } from "react";
import { DesignerEngineContext } from "core-react/contexts";

export function useLocalesManager(){
  const designer = useContext<IDesignerEngine|undefined>(DesignerEngineContext)
  return designer?.getLoacalesManager();
}