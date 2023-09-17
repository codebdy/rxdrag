import { Identifier } from "../dnd/types";
import { useItemsState } from "./useItemsState";

export function useItem(id?: Identifier | null) {
  const [items] = useItemsState()
  return items.find(item => item.id === id)
}