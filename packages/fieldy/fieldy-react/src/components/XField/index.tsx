import { DisplayType, IFieldMeta } from "@rxdrag/fieldy-schema"
import React, { memo, useCallback, useEffect, useState } from "react"
import { FieldContext } from "../../contexts"
import { useRegisterField } from "./hooks/useRegisterField"
import { FieldState } from "@rxdrag/fieldy"

export const XField = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode,
  initialValue?: unknown,
  value?: unknown,
  defaultValue?: unknown,
}) => {
  const { fieldMeta, initialValue, value, defaultValue, children } = props
  const [hidden, setHidden] = useState(false);
  const field = useRegisterField(fieldMeta)
  const handleFieldChange = useCallback((fieldState: FieldState | undefined) => {
    setHidden(fieldState?.hidden || fieldState?.display === DisplayType.hidden || fieldState?.display === DisplayType.none)
  }, [])

  useEffect(() => {
    initialValue !== undefined && field?.setInitialValue(initialValue)
  }, [field, initialValue])

  useEffect(() => {
    value !== undefined && field?.setValue(value)
  }, [field, value])

  useEffect(() => {
    defaultValue !== undefined && field?.setDefaultValue(defaultValue)
  }, [field, defaultValue])

  useEffect(() => {
    setHidden(field?.form.getFieldState(field.path)?.hidden || false)
  }, [field?.form, field?.path])

  useEffect(() => {
    const unsub = field?.fieldy.subscribeToFieldChange(field.form.name, field.path, handleFieldChange)
    return unsub
  }, [field?.fieldy, field?.form.name, field?.path, handleFieldChange])

  return (
    <FieldContext.Provider value={field}>
      {
        hidden === false && children
      }
    </FieldContext.Provider>
  )
})