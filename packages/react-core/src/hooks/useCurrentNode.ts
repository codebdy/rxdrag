import { ITreeNode } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useCurrentNode() {
  const [node, setNode] = useState<ITreeNode | null>(null)
  const designer = useDesignerEngine()

  useEffect(() => {
    const currentNode = designer?.getMonitor().getCurrentNode() || null
    setNode(currentNode)
  }, [designer])

  const handleCurrentChange = useCallback((current: ITreeNode | null) => {
    setNode(current)
  }, [])
  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToCurrentNodeChanged(handleCurrentChange)

    return () => {
      unscribe?.()
    }
  }, [designer, handleCurrentChange])

  return node
}