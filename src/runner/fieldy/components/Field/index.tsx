import { memo } from "react"
import { FieldType } from "runner/fieldy/interfaces"
import { XField } from "../XField"
import { useCreateFieldSchema } from "../XField/hooks/useCreateFieldSchema"

//动态增加字段用这个，否则不要碰它
export const Field = memo((
  props: {
    name: string,
    value?: any,
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