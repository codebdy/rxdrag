import { Identifier } from "../dnd";
import { useFlattenItems } from "./useFlattenItems";
import { useCallback } from "react";

export function useGetFlattenItem() {
  const items = useFlattenItems()
  const getItem = useCallback((id?: Identifier | null) => {
    return items.find(item => item.meta.id === id)
  }, [items])
  return getItem
}