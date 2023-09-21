import React from "react"
import { memo } from "react"
import { Field } from "../Field"

//动态增加字段用这个，否则不要碰它
export const ArrayField = memo((
  props: {
    name: string,
    value?: unknown[],
    initialValue?: unknown[],
    defaultValue?: unknown[],
    children?: React.ReactNode
  }
) => {
  const { name, value, initialValue, defaultValue, children } = props
  console.log("====>ArrayField", props, children)
  return (
    <>
      hhhhhhh
      <Field name={name} value={value} initialValue={initialValue} defaultValue={defaultValue} type="array">
        呵呵呵
        {children}
      </Field>
    </>
  )
})