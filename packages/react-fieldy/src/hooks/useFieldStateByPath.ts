import { FieldState } from "@rxdrag/fieldy";
import { useCallback, useEffect, useState } from "react";
import { useFieldy } from "./useFieldy";
import { useForm } from "./useForm";

export function useFieldStateByPath(fieldPath: string) {
  const [fieldState, setFieldState] = useState<FieldState>()
  const fieldy = useFieldy()
  const form = useForm()

  useEffect(() => {
    if (fieldPath) {
      setFieldState(form?.getFieldState(fieldPath))
    }
  }, [fieldPath, fieldy, form])

  const handleFieldChange = useCallback((fieldState: FieldState | undefined) => {
    setFieldState(fieldState)
  }, [])

  useEffect(() => {
    if (form?.name && fieldPath) {
      const unsub = fieldy?.subscribeToFieldChange(form.name, fieldPath, handleFieldChange)
      return unsub
    }
  }, [fieldPath, fieldy, form?.name, handleFieldChange])

  return fieldState
}