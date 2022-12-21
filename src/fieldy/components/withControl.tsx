import { useField } from "fieldy/hooks/useField"
import { IFieldMeta } from "fieldy/interfaces"
import { memo, useCallback } from "react"

export function withControl(WrappedComponent: React.FC<any>, fieldMeta?: IFieldMeta): React.FC<any> {
  if (!fieldMeta || (fieldMeta.type === "normal" && fieldMeta.withControl === undefined) || fieldMeta.withControl) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const { value, setValue } = useField()

    const handleChange = useCallback((e?: { target?: { value?: any, [key: string]: any } }) => {
      const propName = fieldMeta.valuePropName || "value"
      let newValue = e?.target?.[propName]
      if (newValue === undefined && !e?.target) {
        newValue = e
      }
      setValue?.(newValue)
    }, [setValue])
    return <WrappedComponent value={value} onChange={handleChange} {...props} />
  })
}
