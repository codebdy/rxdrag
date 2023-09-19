import { Identifier } from "../dnd";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useCallback } from "react";

export function useGetItem() {
  const [items] = useMenuSchemaState()
  const getItem = useCallback((id?: Identifier | null) => {
    return items.find(item => item.id === id)
  }, [items])
  return getItem
}