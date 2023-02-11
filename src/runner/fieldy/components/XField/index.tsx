import { FieldContext } from "runner/fieldy/contexts"
import { IFieldMeta } from "runner/fieldy/interfaces"
import React, { memo } from "react"
import { useRegisterField } from "./hooks/useRegisterField"

export const XField = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode,
  value?: any,
}) => {
  const { fieldMeta, value, children } = props
  //const params = useCreateFieldParams(fieldMeta)
  //const name = useFormName()
  const field = useRegisterField(fieldMeta, value)
  return (
    <FieldContext.Provider value={field}>
      {
        children
      }
    </FieldContext.Provider>
  )
})