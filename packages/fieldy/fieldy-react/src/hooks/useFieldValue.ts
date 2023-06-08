import { useCallback, useEffect, useState } from "react";
import { useField } from "./useField";

export function useFieldValue() {
  const [value, setValue] = useState<unknown>()
  const field = useField()
  useEffect(() => {
    setValue(field?.getValue())
  }, [field])

  const handleValueChange = useCallback((val?: unknown) => {
    setValue(val)
  }, [])

  useEffect(() => {
    const unsub = field?.onValueChange(handleValueChange)
    return () => {
      unsub?.()
    }
  }, [field, handleValueChange])

  return value
}