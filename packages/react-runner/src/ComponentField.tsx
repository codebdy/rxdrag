import React, { memo, useMemo } from "react"
import { IFieldMeta } from "@rxdrag/schema"
import { parsePathValue } from "@rxdrag/fieldy"
import { XField, useFieldNode } from "@rxdrag/react-fieldy"

export const ComponentField = memo((
  props: {
    fieldMeta?: IFieldMeta,
    children?: React.ReactNode
  }
) => {
  const { fieldMeta, children } = props
  const parentField = useFieldNode()

  const view = useMemo(() => {
    if (fieldMeta?.name || fieldMeta?.type === "fragment") {
      const initialValue = parsePathValue(parentField?.value, fieldMeta.name)
      return <XField fieldMeta={fieldMeta} initialValue={initialValue}>
        {children}
      </XField>
    }
    return <>{children}</>
  }, [children, fieldMeta, parentField])

  return view
})