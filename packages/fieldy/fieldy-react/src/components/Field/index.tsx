import React from "react"
import { memo } from "react"
import { XField } from "../XField"
import { useCreateFieldSchema } from "../XField/hooks/useCreateFieldSchema"
import { FieldType } from "@rxdrag/fieldy-schema"

//动态增加字段用这个，否则不要碰它
export const Field = memo((
  props: {
    name: string | number,
    initialValue?: unknown,
    value?: unknown,
    defaultValue?: unknown,
    children?: React.ReactNode,
    type?: FieldType,
  }
) => {
  const { name, value, initialValue, defaultValue, children, type } = props
  const fieldMeta = useCreateFieldSchema(name, type)
  return (
    <XField fieldMeta={fieldMeta} initialValue={initialValue} value={value} defaultValue={defaultValue}>
      {children}
    </XField>
  )
})