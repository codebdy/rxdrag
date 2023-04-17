import React from "react"
import { memo, useMemo } from "react"
import { ComponentField } from "./ComponentField"
import { ComponentSchemaContext } from "./contexts"
import { IBindParams } from "./interfaces"
import { withController } from "./hocs/withController"
import { withBind } from "./hocs/withBind"
import { IFieldMeta, INodeSchema } from "@rxdrag/schema"
import { ID } from "@rxdrag/shared"
import { usePreviewComponent } from "./hooks"

export interface IComponentRenderSchema extends INodeSchema<IFieldMeta<IBindParams>> {
  id: ID,
  children?: IComponentRenderSchema[]
  slots?: {
    [name: string]: IComponentRenderSchema | undefined
  }
}
export type ComponentViewProps = {
  node: IComponentRenderSchema,
}

export const ComponentView = memo((
  props: ComponentViewProps
) => {
  const { node, ...other } = props
  const com = usePreviewComponent(node.componentName)

  const Component = useMemo(() => com && withBind(withController(com, node["x-controller"]), node?.["x-field"]), [com, node]);
  const slots = useMemo(() => {
    const slts: { [key: string]: React.ReactElement } = {}
    for (const name of Object.keys(node?.slots || {})) {
      const slot = node?.slots?.[name]
      if (slot) {
        slts[name] = <ComponentView node={slot} />
      }
    }

    return slts
  }, [node?.slots])

  return (
    node &&
    <ComponentSchemaContext.Provider value={node}>
      <ComponentField fieldMeta={node?.["x-field"]}>
        {
          Component &&
          (
            !!node.children?.length ?
              <Component {...node.props} {...slots} {...other}>
                {
                  !node.selfRender && node.children?.map(child => {
                    return (<ComponentView key={child.id} node={child} />)
                  })
                }
              </Component>
              : <Component {...node.props} {...slots} {...other} />
          )
        }
      </ComponentField>
    </ComponentSchemaContext.Provider>
  )
})