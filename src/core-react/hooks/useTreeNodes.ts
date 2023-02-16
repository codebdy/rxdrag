import { ITreeNode, ID } from "core";
import { useCallback, useEffect, useState } from "react";
import { UnListener } from "runner/reaction";
import { useDesignerEngine } from "./useDesignerEngine";

export function useTreeNodes(ids: ID[]) {
  const [nodes, setNodes] = useState<(ITreeNode | null)[] | null>()
  const monitor = useDesignerEngine()?.getMonitor()
  const handleNodeChange = useCallback((nd: ITreeNode) => {
    if (nodes?.find(node => node?.id === nd.id)) {
      setNodes(nodes => nodes?.filter(node => node?.id === nd.id ? nd : node))
    }
  }, [nodes])

  useEffect(() => {
    if (monitor) {
      const nds: (ITreeNode | null)[] = []
      const offs: UnListener[] = []
      for (const id of ids) {
        nds.push(monitor.getNode(id))
        offs.push(monitor?.subscribeToNodeChanged(id, handleNodeChange))
      }
      setNodes(nds)

      return () => {
        for (const off of offs) {
          off?.()
        }
      }
    }

  }, [handleNodeChange, ids, monitor])

  return nodes
}