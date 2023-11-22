import { ITreeNode } from "@rxdrag/core";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useSelect() {
  const engine = useDesignerEngine()
  const select = useCallback((node: ITreeNode) => {
    engine?.getActions().selectNodes([node.id])
  }, [engine])
  return select
}