import { useCallback } from "react";
import { Identifier } from "../types";
import { useActiveIdState } from "./useActiveIdState";

//动态替换activeId，用于通过拖拽创建节点
export function useReplaceActiveId() {
  const [, setActiveId] = useActiveIdState()

  const replace = useCallback((id?: Identifier) => {
    setActiveId(id)
  }, [setActiveId])

  return replace
}