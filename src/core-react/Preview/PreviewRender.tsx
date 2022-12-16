import { ComponentRender } from "core-react/ComponentRender"
import { IComponents } from "core-react/interfaces"
import { PreviewRoot } from "core-react/PreviewRoot"
import { IDesignerEngine, IDocument, INodeSchema } from "core/interfaces"
import { memo, useEffect, useState } from "react"

export const PreviewRender = memo((
  props: {
    engine?: IDesignerEngine,
    components?: IComponents
    doc?: IDocument,
  }
) => {
  const { engine, components, doc } = props
  const [tree, setTree] = useState<INodeSchema>()
  useEffect(() => {
    setTree(doc?.getSchemaTree() || undefined)
  }, [doc])

  useEffect(() => {
    const unsub = engine?.getMonitor().subscribeToNodeChanged(() => {
      setTree(doc?.getSchemaTree() || undefined)
    })

    return () => {
      unsub?.()
    }
  }, [doc, engine])

  return (
    <PreviewRoot
      components={components}
    >
      {
        tree &&
        <ComponentRender
          root={tree}
        />
      }
    </PreviewRoot>
  )
})