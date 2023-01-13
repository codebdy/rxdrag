import { FieldState } from "runner/fieldy/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useFieldy } from "./useFieldy";
import { useFormName } from "./useFormName";

export function useFieldState(fieldPath: string) {
  const [fieldState, setFieldState] = useState<FieldState>()
  const fieldy = useFieldy()
  const formName = useFormName()

  useEffect(() => {
    if (formName && fieldPath) {
      setFieldState(fieldy?.getField(formName, fieldPath))
    }
  }, [fieldPath, fieldy, formName])

  const handleFieldChange = useCallback((fieldState: FieldState | undefined) => {
    setFieldState(fieldState)
  }, [])

  useEffect(() => {
    if (formName && fieldPath) {
      const unsub = fieldy?.subscribeToFieldChange(formName, fieldPath, handleFieldChange)
      return unsub
    }
  }, [fieldPath, fieldy, formName, handleFieldChange])

  return fieldState
}