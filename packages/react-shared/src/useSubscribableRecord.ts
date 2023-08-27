import { ISubscribableRecord } from "@rxdrag/shared";
import { useCallback, useEffect, useState } from "react";

export function useSubscribableRecord<T = unknown>(map: ISubscribableRecord<T>) {
  const [value, setValue] = useState<Record<string, T | undefined>>();

  const handleChange = useCallback((value: Record<string, T | undefined>) => {
    setValue(value)
  }, [])

  useEffect(() => {
    const unsub = map.subscribeChange(handleChange)
    return () => unsub()
  }, [handleChange, map])

  useEffect(() => {
    setValue(map.getRecord())
  }, [map])

  return value
}