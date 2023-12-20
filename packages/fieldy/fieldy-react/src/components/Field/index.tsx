import React from "react"
import { XField } from "../XField"
import { useCreateFieldSchema } from "../XField/hooks/useCreateFieldSchema"
import { FieldType } from "@rxdrag/fieldy"
import { IYupValidateSchema } from "@rxdrag/fieldy-yup-validation"

//动态增加字段用这个，否则不要碰它
export const Field = (
  props: {
    //数组时会使用number
    name: string | number,
    initialValue?: unknown,
    value?: unknown,
    defaultValue?: unknown,
    children?: React.ReactNode,
    type?: FieldType,
    rules?: IYupValidateSchema,
  }
) => {
  const { name, value, initialValue, defaultValue, children, type, rules } = props
  const fieldMeta = useCreateFieldSchema(name, type, defaultValue, rules)

  return (
    <XField fieldMeta={fieldMeta} initialValue={initialValue} value={value}>
      {children}
    </XField>
  )
}