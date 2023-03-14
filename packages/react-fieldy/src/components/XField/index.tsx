import { IFieldMeta } from "@rxdrag/schema"
import React, { memo } from "react"
import { FieldContext } from "../../contexts"
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