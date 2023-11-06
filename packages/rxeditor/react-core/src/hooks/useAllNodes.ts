import { ITreeNode } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useAllNodes() {
  const [nodes, setNodes] = useState<ITreeNode[]>([])
  const designer = useDesignerEngine()

  const getAllNodes = useCallback(() => {
    const nds = designer?.getMonitor().getAllNodes() || []
    setNodes(nds)
  }, [designer])

  useEffect(() => {
    getAllNodes()
  }, [getAllNodes])

  const handleTreeChange = useCallback(() => {
    getAllNodes()
  }, [getAllNodes])

  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToActiveDocumentChanged(handleTreeChange)
    const unscibeNode = designer?.getMonitor().subscribeToHasNodeChanged(handleTreeChange)
    return () => {
      unscribe?.()
      unscibeNode?.()
    }
  }, [designer, handleTreeChange])

  return nodes
}