import { UniqueIdentifier } from "@dnd-kit/core";
import { useItemsState } from "./useItemsState";

export function useItem(id?: UniqueIdentifier | null) {
  const [items] = useItemsState()
  return items.find(item => item.id === id)
}