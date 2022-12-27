import { IFieldMeta } from "fieldy"
import { Field } from "fieldy/components/Field"
import React, { memo, useMemo } from "react"

export const ComponentField = memo((
  props: {
    fieldMeta?: IFieldMeta,
    children?: React.ReactNode
  }
) => {
  const { fieldMeta, children } = props
  const view = useMemo(() => {
    if (fieldMeta?.name || fieldMeta?.type === "fragment") {
      return <Field fieldMeta={fieldMeta}>
        {children}
      </Field>
    }
    return <>{children}</>
  }, [children, fieldMeta])

  return view
})