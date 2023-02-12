import { IFieldMeta } from "runner/fieldy"
import { XField } from "runner/fieldy/components/XField"
import React, { memo, useMemo } from "react"
import { useFieldNode } from "runner/fieldy/hooks/useFieldNode"
import { parseValue } from "runner/fieldy/path/parseValue"

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
      const initialValue = parseValue(parentField?.value, fieldMeta.name)
      return <XField fieldMeta={fieldMeta} initialValue = {initialValue}>
        {children}
      </XField>
    }
    return <>{children}</>
  }, [children, fieldMeta, parentField])

  return view
})