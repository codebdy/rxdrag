import { memo } from "react"
import { useCreateFieldSchema } from "runner/fieldy/components/XField/hooks/useCreateFieldSchema"
import { XField } from "../XField"

//动态增加字段用这个，否则不要碰它
export const ArrayField = memo((
  props: {
    name: string,
    value?: any[],
    children?: React.ReactNode
  }
) => {
  const { name, value, children } = props
  const fieldMeta = useCreateFieldSchema(name, "array")
  return (
    <XField fieldMeta={fieldMeta} initialValue={value}>
      {children}
    </XField>
  )
})