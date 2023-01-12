import { IFieldMeta } from "runtime/fieldy"
import { XField } from "runtime/fieldy/components/XField"
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
      return <XField fieldMeta={fieldMeta}>
        {children}
      </XField>
    }
    return <>{children}</>
  }, [children, fieldMeta])

  return view
})