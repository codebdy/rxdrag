import { IResourceNode } from "@rxdrag/core";
import { useEffect, useState } from "react";
import { useResourceManager } from "./useResourceManager";

export function useResourceNode(name: string) {
  const [resourceNode, setResourceNode] = useState<IResourceNode<React.ReactNode>>()
  const resoureManager = useResourceManager();
  useEffect(() => {
    if (name) {
      setResourceNode(resoureManager?.getResourceByName(name) as IResourceNode<React.ReactNode> || undefined)
    }
  }, [name, resoureManager])

  return resourceNode
}