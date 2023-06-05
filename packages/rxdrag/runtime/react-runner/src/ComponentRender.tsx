import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"
import { ComponentView, IComponentRenderSchema } from "./ComponentView"
import { transToRenderSchema } from "./transform"
import { IFieldMeta } from "@rxdrag/fieldy-schema"
import { IBindParams } from "./interfaces"

export const ComponentRender = memo((props: {
  root: INodeSchema
}) => {
  const { root } = props
  const [node, setNode] = useState<IComponentRenderSchema>()
  useEffect(() => {
    if (root) {
      setNode(transToRenderSchema(root as INodeSchema<IFieldMeta<IBindParams> | undefined>))
    } else {
      setNode(undefined)
    }
  }, [root])

  return (
    <>
      {node && <ComponentView node={node} />}
    </>
  )
})