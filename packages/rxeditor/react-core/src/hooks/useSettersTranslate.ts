import { useCallback } from "react";
import { useTranslate } from "@rxdrag/react-locales";

export function useSettersTranslate() {
  const t1 = useTranslate("setters")
  const t = useCallback((key: string): string => {
    return t1(key)
  }, [t1])

  return t
}