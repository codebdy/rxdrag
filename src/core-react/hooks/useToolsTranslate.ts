import { useCallback } from "react";
import { useTranslate } from "./useTranslate";

export function useToolsTranslate() {
  const t1 = useTranslate("tools")
  const t = useCallback((key: string) => {
    return t1(key)
  }, [t1])

  return t
}