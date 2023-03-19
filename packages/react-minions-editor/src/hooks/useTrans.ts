import { useCallback } from "react"
import { useTranslate } from "@rxdrag/react-locales"

export function useTrans() {
  const t = useTranslate();
  const trans = useCallback((message?: string) => {
    if (message?.startsWith('$')) {
      return t(message?.substring(1))
    }
    return message
  }, [t])

  return trans
}