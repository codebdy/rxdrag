import { FieldContext } from "fieldy/contexts"
import { IFieldMeta } from "fieldy/interfaces"
import React, { memo } from "react"
import { useCreateFieldParams } from "./hooks/useCreateFieldParams"

export const XField = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode
}) => {
  const { fieldMeta, children } = props

  const params = useCreateFieldParams(fieldMeta)

  return (
    <FieldContext.Provider value={params}>
      {
        children
      }
    </FieldContext.Provider>
  )
})