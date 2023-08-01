import { IDesignerEngine } from "@rxdrag/core";
import { ILocalesManager } from "@rxdrag/locales";
import { useContext } from "react";
import { DesignerEngineContext } from "../contexts";

export function useLocalesManager(): ILocalesManager | undefined {
  const designer = useContext<IDesignerEngine | undefined>(DesignerEngineContext)
  return designer?.getLocalesManager();
}