import { memo } from "react"
import { XField } from "../XField"
import { useCreateFieldSchema } from "../XField/hooks/useCreateFieldSchema"

//动态增加字段用这个，否则不要碰它
export const ObjectField = memo((
  props: {
    name: string,
    value?: any,
    children?: React.ReactNode
  }
) => {
  const { name, value, children } = props
  const  fieldMeta = useCreateFieldSchema(name, "object")
  return (
    <XField fieldMeta={fieldMeta} initialValue = {value}>
      {children}
    </XField>
  )
})