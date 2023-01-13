import { useField } from "runner/fieldy/hooks/useField"
import { IFieldMeta } from "runner/fieldy/interfaces"
import { memo, useCallback } from "react"
import { IBindParams } from "./interfaces"

export function withControl(WrappedComponent: React.FC<any> | React.ComponentClass<any>, fieldMeta?: IFieldMeta<IBindParams>): React.FC<any> | React.ComponentClass<any> {
  const fieldType = fieldMeta?.type || "normal"

  if (!fieldMeta) {
    return WrappedComponent
  }

  if (fieldType === "normal" && fieldMeta.params?.withControl === false) {
    return WrappedComponent
  } else if (fieldType !== "normal" && !fieldMeta.params?.withControl) {
    return WrappedComponent
  }
  const propName = fieldMeta.params?.valuePropName || "value"

  return memo((props: any) => {
    const { value, setValue } = useField()
    const trigger = fieldMeta.params?.trigger || "onChange"
    const handleChange = useCallback((e?: { target?: { value?: any, [key: string]: any } }) => {
      let newValue = e?.target?.[propName]
      if (newValue === undefined && !e?.target) {
        newValue = e
      }
      setValue?.(newValue)
    }, [setValue])
    return <WrappedComponent {...{ [propName]: value, [trigger]: handleChange }} {...props} />
  })
}
