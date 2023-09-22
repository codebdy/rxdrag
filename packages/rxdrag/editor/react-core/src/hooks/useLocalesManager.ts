import { IDesignerEngine } from "@rxdrag/core";
import { IRxDragLocalesManager } from "@rxdrag/locales";
import { useContext } from "react";
import { DesignerEngineContext } from "../contexts";

export function useLocalesManager(): IRxDragLocalesManager | undefined {
  const designer = useContext<IDesignerEngine | undefined>(DesignerEngineContext)
  return designer?.getLocalesManager();
}