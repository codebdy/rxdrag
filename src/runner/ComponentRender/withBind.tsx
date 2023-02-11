import { useField } from "runner/fieldy/hooks/useField"
import { IFieldMeta } from "runner/fieldy/interfaces"
import { memo, useCallback, useEffect, useState } from "react"
import { IBindParams } from "./interfaces"

export function withBind(WrappedComponent: React.FC<any> | React.ComponentClass<any>, fieldMeta?: IFieldMeta<IBindParams>): React.FC<any> | React.ComponentClass<any> {
  const fieldType = fieldMeta?.type || "normal"

  if (!fieldMeta) {
    return WrappedComponent
  }

  if (fieldType === "normal" && fieldMeta.params?.withBind === false) {
    return WrappedComponent
  } else if (fieldType !== "normal" && !fieldMeta.params?.withBind) {
    return WrappedComponent
  }
  const propName = fieldMeta.params?.valuePropName || "value"

  return memo((props: any) => {
    const [ value, setValue ] = useState<any>()
    const field = useField()
    const trigger = fieldMeta.params?.trigger || "onChange"
    const handleChange = useCallback((e?: { target?: { value?: any, [key: string]: any } }) => {
      let newValue = e?.target?.[propName]
      if (newValue === undefined && !e?.target) {
        newValue = e
      }
      field?.inpuValue(newValue)
    }, [field])

    const handleValueChange = useCallback((value:any)=>{
      setValue(value)
    }, [])

    useEffect(()=>{
      return field?.onValueChange(handleValueChange)
    }, [field, handleValueChange])

    useEffect(()=>{
      setValue(field?.value)
    }, [field?.value])

    return <WrappedComponent {...{ [propName]: value, [trigger]: handleChange }} {...props} />
  })
}
