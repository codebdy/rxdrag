import { memo } from "react"
import { useCreateField } from "runner/fieldy/hooks/useCreateField"
import { XField } from "../XField"

//动态增加字段用这个，否则不要碰它
export const ObjectField = memo((
  props: {
    name: string,
    value?: any,
    children?: React.ReactNode
  }
) => {
  const { name, value, children } = props
  const  fieldMeta = useCreateField(name, "object", value)

  return (
    <XField fieldMeta={fieldMeta}>
      {children}
    </XField>
  )
})