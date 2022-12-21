import { IFieldMeta } from "core"
import { useComponentSchema } from "core-react/ComponentRender/hooks/useComponentSchema"
import { usePreviewComponents } from "core-react/hooks/usePreviewComponents"
import { useField } from "fieldy/hooks/useField"

export function withControl(WrappedComponent: React.FC<any>, fieldMeta?: IFieldMeta): React.FC<any> {
  if (!fieldMeta || (fieldMeta.type === "normal" && fieldMeta.withControl === undefined) || fieldMeta.withControl ) {
    return WrappedComponent
  }

  return (props: any) => {
    const { children } = props
    const { fieldMeta } = useField()
    const { components } = usePreviewComponents()
    const componentSchema = useComponentSchema()

    return <WrappedComponent {...props} />
  }
}
