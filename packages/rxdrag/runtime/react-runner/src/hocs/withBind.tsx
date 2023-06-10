import React from "react"
import { useField } from "@rxdrag/react-fieldy"
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useState } from "react"
import { IBindParams } from "../interfaces"
import { IFieldMeta } from "@rxdrag/fieldy-schema"

export function withBind(WrappedComponent: ReactComponent, fieldMeta?: IFieldMeta<IBindParams>): ReactComponent {

  if (!fieldMeta?.params?.withBind) {
    return WrappedComponent
  }

  const propName = fieldMeta.params?.valuePropName || "value"

  return memo((props: {value?:unknown}) => {
    const [value, setValue] = useState<unknown>(props?.value)
    const field = useField()

    const trigger = fieldMeta.params?.trigger || "onChange"
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
