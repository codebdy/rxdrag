import React, { memo } from "react"
import { useField } from "@rxdrag/react-fieldy"
import { ReactComponent } from "@rxdrag/react-shared"
import { useCallback, useEffect, useState } from "react"
import { IFieldMeta } from "@rxdrag/fieldy"

export function withBind(WrappedComponent: ReactComponent, fieldMeta?: IFieldMeta): ReactComponent {
  //数组跟对象类型不需要绑定
  if (fieldMeta?.type === "object" || fieldMeta?.type === "array" || !fieldMeta) {
    return WrappedComponent
  }

  const propName = /*fieldMeta.params?.valuePropName || */"value"

  return memo((props: { value?: unknown }) => {
    const [value, setValue] = useState<unknown>(props?.value)
    const field = useField()

    const trigger = /*fieldMeta.params?.trigger || */"onChange"
    const handleChange = useCallback((e?: { target?: { value?: unknown, [key: string]: unknown } }) => {
      let newValue = e?.target?.[propName]
      if (newValue === undefined && !e?.target) {
        newValue = e
      }
      field?.inputValue(newValue)
    }, [field])

    const handleValueChange = useCallback((value: unknown) => {
      setValue(value)
    }, [])
    useEffect(() => {
      return field?.onValueChange(handleValueChange)
    }, [field, handleValueChange])

    useEffect(() => {
      setValue(field?.getValue())
    }, [field])

    return <WrappedComponent {...props} {...{ [propName]: value, [trigger]: handleChange }} />
  })
}
