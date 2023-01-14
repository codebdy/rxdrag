import { useField } from "runner/fieldy/hooks/useField"
import { IFieldMeta } from "runner/fieldy/interfaces"
import { memo, useCallback } from "react"
import { IBindParams } from "./interfaces"

export function widthControler(WrappedComponent: React.FC<any> | React.ComponentClass<any>, fieldMeta?: IFieldMeta<IBindParams>): React.FC<any> | React.ComponentClass<any> {
  const fieldType = fieldMeta?.type || "normal"

  if (!fieldMeta) {
    return WrappedComponent
  }

  if (fieldType === "normal" && fieldMeta.params?.windBind === false) {
    return WrappedComponent
  } else if (fieldType !== "normal" && !fieldMeta.params?.windBind) {
    return WrappedComponent
  }
  const propName = fieldMeta.params?.valuePropName || "value"

  return memo((props: any) => {
    const { value, setValue } = useField()

    return <WrappedComponent {...{ [propName]: value }} {...props} />
  })
}
