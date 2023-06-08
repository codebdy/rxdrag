import React from "react"
import { memo } from "react"
import { XField } from "../XField"
import { useCreateFieldSchema } from "../XField/hooks/useCreateFieldSchema"
import { FieldType } from "@rxdrag/fieldy-schema"

//动态增加字段用这个，否则不要碰它
export const Field = memo((
  props: {
    name: string,
    value?: unknown,
    children?: React.ReactNode,
    type?: FieldType,
  }
) => {
  const { name, value, children, type } = props
  const fieldMeta = useCreateFieldSchema(name, type)
  return (
    <XField fieldMeta={fieldMeta} initialValue={value}>
      {children}
    </XField>
  )
})