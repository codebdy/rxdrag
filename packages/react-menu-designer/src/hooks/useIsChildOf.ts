import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useGetFlattenItem } from "./useGetFlattenItem";

export function useIsChildOf() {
  const getItem = useGetFlattenItem()
  const isChildOf = useCallback((childId: Identifier, parentId: Identifier) => {
    const child = getItem(childId)
    if (child) {
      if (child.parentId === parentId) {
        return true
      } else if (child.parentId) {
        return isChildOf(child.parentId, parentId)
      }
    }

    return false
  }, [getItem])

  return isChildOf
}