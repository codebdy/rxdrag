import { useField } from "runner/fieldy/hooks/useField"
import { IFieldMeta } from "runner/fieldy/interfaces"
import { memo, useCallback, useEffect, useState } from "react"
import { IBindParams } from "../interfaces"
import { ReactComponent } from "../types"


export function withBind(WrappedComponent: ReactComponent, fieldMeta?: IFieldMeta<IBindParams>): ReactComponent {

  if (!fieldMeta?.params?.withBind) {
    return WrappedComponent
  }

  const propName = fieldMeta.params?.valuePropName || "value"

  return memo((props: any) => {
    const [value, setValue] = useState<any>(props?.value)
    const field = useField()

    const trigger = fieldMeta.params?.trigger || "onChange"
    const handleChange = useCallback((e?: { target?: { value?: any, [key: string]: any } }) => {
      let newValue = e?.target?.[propName]
      if (newValue === undefined && !e?.target) {
        newValue = e
      }
      field?.inpuValue(newValue)
    }, [field])

    const handleValueChange = useCallback((value: any) => {
      setValue(value)
    }, [])

    useEffect(() => {
      return field?.onValueChange(handleValueChange)
    }, [field, handleValueChange])

    //withBind判断不准时，这个代码会有奇怪的堆栈溢出bug,不要依赖field.value,只能依赖field用来取初始值
    useEffect(() => {
      setValue(field?.value)
    }, [field])
    return <WrappedComponent {...props} {...{ [propName]: value, [trigger]: handleChange }} />
  })
}
