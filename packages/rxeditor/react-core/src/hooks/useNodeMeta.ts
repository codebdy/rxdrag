import { ITreeNode } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";
import { INodeMeta } from "@rxdrag/schema";
import { ID } from "@rxdrag/shared";

export function useNodeMeta(id?: ID) {
  const [meta, setMeta] = useState<INodeMeta | null>(null)
  const designer = useDesignerEngine()

  useEffect(() => {
    if (id) {
      const node = designer?.getMonitor().getNode(id) || null
      setMeta(node?.meta || null)
    }
  }, [designer, id])

  const handleNodeChange = useCallback((node: ITreeNode | null) => {
    setMeta(node?.meta || null)
  }, [])
  useEffect(() => {
    if (id) {
      const unscribe = designer?.getMonitor().subscribeToNodeChanged(id, handleNodeChange)
      return () => {
        unscribe?.()
      }
    }
  }, [designer, handleNodeChange, id])

  return meta
}