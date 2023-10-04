import { useCallback } from "react";
import { EditorStore } from "../classes";

export function useGetNodeMeta(store: EditorStore | undefined) {
  const getNodeMeta = useCallback((id?: string) => {
    const nodes = store?.store.getState().nodes
    const nodeMeta = nodes?.find(nd => nd.id === id)
    if (nodeMeta) {
      return nodeMeta
    }
    for (const node of nodes || []) {
      const childMeta = node.children?.nodes?.find(nd => nd.id === id)
      if (childMeta) {
        return childMeta
      }
    }
  }, [store])
  return getNodeMeta
}