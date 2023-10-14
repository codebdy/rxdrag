import React, { memo, useMemo } from "react"
import { XField } from "@rxdrag/react-fieldy"
import { IFieldMeta } from "@rxdrag/fieldy"

export const ComponentField = memo((
  props: {
    fieldMeta?: IFieldMeta,
    children?: React.ReactNode
  }
) => {
  const { fieldMeta, children } = props
  //const parentField = useFieldNode()

  const view = useMemo(() => {
    if (fieldMeta?.name) {
      //自动渲染没有数组，所以可以这么处理
      //const initialValue = parsePathValue(parentField?.getInitialValue(), fieldMeta.name.toString())
      //const defaultValue = parsePathValue(parentField?.getDefaultValue(), fieldMeta.name.toString())
      return <XField
        fieldMeta={fieldMeta}
      //initialValue={initialValue}
      //defaultValue={fieldMeta.defaultValue !== undefined ? fieldMeta.defaultValue : defaultValue}
      >
        {children}
      </XField>
    }
    return <>{children}</>
  }, [children, fieldMeta])

  return view
})