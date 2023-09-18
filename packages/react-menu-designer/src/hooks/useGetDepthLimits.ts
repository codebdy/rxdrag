import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useGetItem } from "./useGetItem";
import { useGetChildren } from "./useGetChildren";
import { useGetBelowBrother } from "./useGetBelowBrother";

export function useGetDepthLimits() {
  const getItem = useGetItem()
  const getChildren = useGetChildren()
  const getBelowBrother = useGetBelowBrother()

  const getDepthLimits = useCallback((belowAtId: Identifier | undefined) => {
    const belowAtItem = getItem(belowAtId)

    if (!belowAtItem) {
      return {
        max: 0,
        min: 0,
      }
    }

    const children = getChildren(belowAtId)

    if (children?.length) {
      return {
        max: 1 + belowAtItem.depth,
        min: 1 + belowAtItem.depth,
      }
    }

    const belowBrother = getBelowBrother(belowAtId || "")
    if (belowBrother) {
      return {
        max: 1 + belowAtItem.depth,
        min: 0 + belowAtItem.depth,
      }
    }

    //如果后面没有子节点
    return {
      max: 1 + belowAtItem.depth,
      min: 0,
    }
  }, [getBelowBrother, getChildren, getItem])

  return getDepthLimits
}