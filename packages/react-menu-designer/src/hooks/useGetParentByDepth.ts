import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useGetItem } from "./useGetItem";
import { useGetFlattenItem } from "./useGetFlattenItem";

export function useGetParentByDepth() {
  const getItem = useGetItem()
  const getFlattenItem = useGetFlattenItem()

  const getParentByDepth = useCallback((id: Identifier, depth: number) => {
    const item = getItem(id)
    const parentFlattenItem = getFlattenItem(item?.parentId)
    if (parentFlattenItem) {
      if (parentFlattenItem?.depth === depth) {
        return parentFlattenItem.meta.id
      } else {
        return getParentByDepth(parentFlattenItem.meta.id, depth)
      }
    }
  }, [getFlattenItem, getItem])

  return getParentByDepth
}