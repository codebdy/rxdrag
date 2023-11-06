import { IFieldMeta } from "@rxdrag/fieldy"
import React, { memo, useEffect } from "react"
import { FieldContext } from "../../contexts"
import { useRegisterField } from "./hooks/useRegisterField"

export const XField = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode,
  initialValue?: unknown,
  value?: unknown,
  defaultValue?: unknown,
}) => {
  const { fieldMeta, initialValue, value, defaultValue, children } = props
  const field = useRegisterField(fieldMeta)

  useEffect(() => {
    initialValue !== undefined && field?.setInitialValue(initialValue)
  }, [field, initialValue])

  useEffect(() => {
    value !== undefined && field?.setValue(value)
  }, [field, value])

  useEffect(() => {
    defaultValue !== undefined && field?.setDefaultValue(defaultValue)
  }, [field, defaultValue])

  return (
    <FieldContext.Provider value={field}>
      {
        field && children
      }
    </FieldContext.Provider>
  )
})