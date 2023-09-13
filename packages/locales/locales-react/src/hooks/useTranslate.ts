import { useCallback, useEffect, useState } from "react";
import { useLocalesManager } from "./useLocalesManager";

export function useTranslate(module?: string) {
  const [flag, setFlag] = useState(0)
  const localesManager = useLocalesManager()
  const t = useCallback((key: string) => {
    const keyPath = module ? module + "." + key : key
    return localesManager?.getMessage(keyPath) || key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localesManager, module, flag])

  const handleLocalesMangagerChange = useCallback(() => {
    setFlag(flag => flag + 1)
  }, [])

  useEffect(() => {
    const unsub = localesManager?.subscribeChange(handleLocalesMangagerChange)

    return unsub
  }, [handleLocalesMangagerChange, localesManager])

  return t
}