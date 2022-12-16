import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";
import { useLanguage } from "./useLanguage";

export function useTranslate(module: string) {
  const engine = useDesignerEngine()
  const lang = useLanguage()
  const t = useCallback((key: string) => {
    return engine?.getLoacalesManager().getMessage(module + "." + key) || key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, lang])

  return t
}