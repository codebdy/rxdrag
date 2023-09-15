import { UniqueIdentifier } from "@dnd-kit/core";
import { useResourceItemsState } from "./useResourceItemsState";
import { useCallback } from "react";

export function useGetResourceItem() {
  const [items] = useResourceItemsState()
  const getItem = useCallback((id?: UniqueIdentifier | null) => {
    return items.find(item => item.id === id)
  }, [items])
  return getItem
}