import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";
import { useLanguage } from "./useLanguage";
import { useTranslate } from "@rxdrag/react-locales";

export function useComponentTranslate(component: string) {
  const t1 = useTranslate("components")
  const engine = useDesignerEngine()
  const lang = useLanguage()
  const t = useCallback((key: string) => {
    return t1(component + "." + key) || key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, lang])

  return t
}