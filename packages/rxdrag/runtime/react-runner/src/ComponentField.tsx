import React, { memo, useMemo } from "react"
import { parsePathValue } from "@rxdrag/fieldy"
import { XField, useFieldNode } from "@rxdrag/react-fieldy"
import { IFieldMeta } from "@rxdrag/fieldy-schema"

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
      const initialValue = parsePathValue(parentField?.getInitialValue(), fieldMeta.name)
      console.log("哈哈 ComponentField", parentField?.getInitialValue(), fieldMeta)
      return <XField fieldMeta={fieldMeta} initialValue={initialValue}>
        {children}
      </XField>
    }
    return <>{children}</>
  }, [children, fieldMeta, parentField])

  return view
})