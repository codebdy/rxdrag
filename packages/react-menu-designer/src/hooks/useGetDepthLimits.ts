import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useGetItem } from "./useGetItem";

export function useGetDepthLimits() {
  const getItem = useGetItem()
  const getDepthLimits = useCallback((afterId: Identifier | undefined) => {
    const afterItem = getItem(afterId)

    if (!afterItem) {
      return {
        max: 0,
        min: 0,
      }
    }

    //如果后面没有子节点
    return{
      max: 1 + afterItem.depth,
      min: 0 + afterItem.depth,
    }
  }, [getItem])

  return getDepthLimits
}