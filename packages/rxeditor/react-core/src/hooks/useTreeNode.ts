import { ITreeNode, ID } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useTreeNode(id: ID) {
  const [node, setNode] = useState<ITreeNode | null>()
  const monitor = useDesignerEngine()?.getMonitor()
  const handleNodeChange = useCallback((nd: ITreeNode) => {
    if (node?.id === nd.id) {
      setNode(nd)
    }
  }, [node?.id])

  useEffect(() => {
    setNode(monitor?.getNode(id))
    const off = monitor?.subscribeToNodeChanged(id, handleNodeChange)

    return off
  }, [handleNodeChange, id, monitor])

  return node
}