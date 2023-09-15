import { UniqueIdentifier } from "@dnd-kit/core";
import { useItemsState } from "./useItemsState";
import { useCallback } from "react";

export function useGetItem() {
  const [items] = useItemsState()
  const getItem = useCallback((id?: UniqueIdentifier|null) => {
    return items.find(item => item.id === id)
  }, [items])
  return getItem
}