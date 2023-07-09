import { useCallback } from "react";
import { EditorStore } from "../classes";

export function useGetNodeMeta(store: EditorStore) {
  const nodes = store.store.getState().nodes
  const getNodeMeta = useCallback((id?: string) => {
    return nodes?.find(nd => nd.id === id)
  }, [nodes])
  return getNodeMeta
}