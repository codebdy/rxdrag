import { ID, INodeSchema } from "core"
import { memo } from "react"
import { ComponentField } from "./ComponentField"
import { ComponentSchemaContext } from "./contexts"
import { usePreviewComponent } from "core-react/hooks/usePreviewComponent"

export interface IComponentRenderSchema extends INodeSchema {
  id: ID,
  children?: IComponentRenderSchema[]
}
export type ComponentViewProps = {
  node: IComponentRenderSchema,
}

export const ComponentView = memo((
  props: ComponentViewProps
) => {
  const { node } = props
  const Component = usePreviewComponent(node.componentName);
  return (
    <ComponentSchemaContext.Provider value={node}>
      <ComponentField fieldMeta={node?.["x-field"]}>
        {
          Component &&
          (
            !!node.children?.length ?
              <Component {...node.props}>
                {
                  node.children?.map(child => {
                    return (<ComponentView key={child.id} node={child} />)
                  })
                }
              </Component>
              : <Component {...node.props} />
          )
        }
      </ComponentField>
    </ComponentSchemaContext.Provider>
  )
})