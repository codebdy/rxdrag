import { ITreeNode } from "core/interfaces";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useSelect() {
  const engine = useDesignerEngine()
  const select = useCallback((node: ITreeNode) => {
    engine?.getActions().selectNodes([node.id], node.documentId)
  }, [engine])
  return select
}