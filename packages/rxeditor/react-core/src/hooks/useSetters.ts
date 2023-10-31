import { ReactComponent } from "@rxdrag/react-shared";
import { useCallback, useEffect, useState } from "react";
import { useSetterManager } from "./useSetterManager";

export function useSetters() {
  const [setters, setSetters] = useState<Record<string, ReactComponent>>()

  const setterManager = useSetterManager();

  const getSetters = useCallback(() => {
    setSetters(setterManager?.getSetters())
  }, [setterManager])

  useEffect(() => {
    getSetters()
  }, [getSetters])

  const handleResourceChange = useCallback(() => {
    getSetters()
  }, [getSetters])

  useEffect(() => {
    const unsub = setterManager?.subscribeChange(handleResourceChange)
    return unsub
  }, [handleResourceChange, setterManager])
  return setters
}