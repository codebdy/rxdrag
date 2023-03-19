import { FieldContext } from "runner/fieldy/contexts"
import { IFieldMeta } from "runner/fieldy/interfaces"
import React, { memo } from "react"
import { useRegisterField } from "./hooks/useRegisterField"

export const XField = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode,
  initialValue?: any,
}) => {
  const { fieldMeta, initialValue, children } = props
  const field = useRegisterField(fieldMeta, initialValue)

  return (
    <FieldContext.Provider value={field}>
      {
        children
      }
    </FieldContext.Provider>
  )
})