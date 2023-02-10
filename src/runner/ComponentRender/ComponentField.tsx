import { IFieldMeta } from "runner/fieldy"
import { XField } from "runner/fieldy/components/XField"
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
      console.log("哈哈", fieldMeta)
      return <XField fieldMeta={fieldMeta}>
        {children}
      </XField>
    }
    return <>{children}</>
  }, [children, fieldMeta])

  return view
})