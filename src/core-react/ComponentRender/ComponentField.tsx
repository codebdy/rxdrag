import { IFieldMeta } from "fieldy"
import { Field } from "fieldy/components/Field"
import React, { memo } from "react"

export const ComponentField = memo((
  props: {
    fieldMeta?: IFieldMeta,
    children?: React.ReactNode
  }
) => {
  const { fieldMeta, children } = props
  return (
    fieldMeta?.name ?
      <Field fieldMeta={fieldMeta}>
        {children}
      </Field>
      : <>{children}</>
  )
})