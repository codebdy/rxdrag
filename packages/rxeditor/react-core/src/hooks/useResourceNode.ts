import { IResourceNode } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useResourceManager } from "./useResourceManager";

export function useResourceNode(name: string) {
  const [resourceNode, setResourceNode] = useState<IResourceNode<React.ReactNode>>()
  const resoureManager = useResourceManager();
  const getNode = useCallback(() => {
    setResourceNode(resoureManager?.getResourceByName(name) as IResourceNode<React.ReactNode> || undefined)
  }, [name, resoureManager])

  useEffect(() => {
    getNode()
  }, [getNode])

  const handleResourceChange = useCallback(() => {
    getNode()
  }, [getNode])

  useEffect(()=>{
    const unsub = resoureManager?.subscribeChange(handleResourceChange)
    return unsub
  }, [handleResourceChange, resoureManager])

  return resourceNode
}