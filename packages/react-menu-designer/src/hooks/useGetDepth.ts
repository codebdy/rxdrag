import { useCallback } from "react";
import { Identifier, Offset } from "../dnd";
import { useGetDepthLimits } from "./useGetDepthLimits";

export function useGetDepth() {
  const getDepthLimits = useGetDepthLimits()
  const getDepth = useCallback((afterId: Identifier | undefined, delta: Offset | undefined, indentationWidth: number) => {
    const limits = getDepthLimits(afterId)
    if (delta) {
      let depth = Math.trunc(delta.x / indentationWidth)
      if (depth < limits.min) {
        depth = limits.min
      } else if (depth > limits.max) {
        depth = limits.max
      }
      return depth
    }

    return 0
  }, [getDepthLimits])

  return getDepth
}