import { FieldContext } from "runner/fieldy/contexts"
import { IFieldMeta } from "runner/fieldy/interfaces"
import React, { memo } from "react"
import { useCreateFieldParams } from "./hooks/useCreateFieldParams"

export const XField = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode
}) => {
  const { fieldMeta, children } = props
  const params = useCreateFieldParams(fieldMeta)
  console.log("哈哈 XField", params)
  return (
    <FieldContext.Provider value={params}>
      {
        children
      }
    </FieldContext.Provider>
  )
})