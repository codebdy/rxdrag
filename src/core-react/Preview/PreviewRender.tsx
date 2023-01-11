import { ComponentRender } from "core-react/ComponentRender"
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState"
import { IComponents } from "core-react/interfaces"
import { PreviewRoot } from "core-react/PreviewRoot"
import { IDocument, INodeSchema } from "core/interfaces"
import { memo, useEffect, useState } from "react"

export const PreviewRender = memo((
  props: {
    components?: IComponents
    doc?: IDocument,
  }
) => {
  const { components, doc } = props
  const [tree, setTree] = useState<INodeSchema>()
  const [viewType] = useDocumentViewTypeState(doc?.id)

  useEffect(() => {
    if (viewType === 'preview') {
      setTree(doc?.getSchemaTree() || undefined)
    }
  }, [doc, viewType])

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