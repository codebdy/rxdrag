import { IFieldMeta } from "fieldy"
import { Field } from "fieldy/components/Field"
import { FieldFragment } from "fieldy/components/FieldFragment"
import React, { memo, useMemo } from "react"

export const ComponentField = memo((
  props: {
    fieldMeta?: IFieldMeta,
    children?: React.ReactNode
  }
) => {
  const { fieldMeta, children } = props
  const view = useMemo(() => {
    if (fieldMeta?.name) {
      return <Field fieldMeta={fieldMeta}>
        {children}
      </Field>
    }

    if(fieldMeta?.type === "fragment"){
      <FieldFragment fieldMeta={fieldMeta}>
        {children}
      </FieldFragment>
    }
    return <>{children}</>
  }, [children, fieldMeta])

  return view
})