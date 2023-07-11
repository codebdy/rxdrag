import { useCallback } from "react";
import { EditorStore } from "../classes";

export function useGetNodeMeta(store: EditorStore) {
  const nodes = store.store.getState().nodes
  const getNodeMeta = useCallback((id?: string) => {
    const nodeMeta = nodes?.find(nd => nd.id === id)
    if(nodeMeta){
      return nodeMeta
    }
    for(const node of nodes){
      const childMeta = node.children?.nodes?.find(nd => nd.id === id)
      if(childMeta){
        return childMeta
      }
    }
  }, [nodes])
  return getNodeMeta
}