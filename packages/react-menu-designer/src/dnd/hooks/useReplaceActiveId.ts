import { useCallback } from "react";
import { useActiveIdState } from "../../hooks/useActiveIdState";
import { Identifier } from "../types";

//动态替换activeId，用于通过拖拽创建节点
export function useReplaceActiveId() {
  const [, setActiveId] = useActiveIdState()

  const replace = useCallback((id?: Identifier | null) => {
    setActiveId(id || null)
  }, [setActiveId])

  return replace
}