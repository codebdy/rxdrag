import { Identifier } from "../dnd";
import { useFlattenItems } from "./useFlattenItems";
import { useCallback } from "react";

export function useGetFlattenItem(draggingId?: Identifier) {
  const items = useFlattenItems(draggingId)
  const getItem = useCallback((id?: Identifier | null) => {
    return items.find(item => item.meta.id === id)
  }, [items])
  return getItem
}