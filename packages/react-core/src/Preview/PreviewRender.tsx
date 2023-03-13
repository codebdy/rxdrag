import { useToken } from "antd/es/theme/internal"
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState"
import { IComponents } from "core-react/interfaces"
import { PreviewRoot } from "core-react/PreviewRoot"
import { IDocument, INodeSchema } from "core/interfaces"
import { memo, useEffect, useMemo, useState } from "react"
import { ComponentRender } from "runner/ComponentRender"
import { Fieldy, VirtualForm } from "runner/fieldy"
import { IReactionMaterial } from "runner/minions"
import { ThemeProvider } from "styled-components"

export const PreviewRender = memo((
  props: {
    components?: IComponents
    doc?: IDocument,
    reactionMaterials: IReactionMaterial[]
  }
) => {
  const { components, doc, reactionMaterials } = props
  const [tree, setTree] = useState<INodeSchema>()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const [, token] = useToken()
  const theme = useMemo(() => {
    return {
      token
    }
  }, [token])

  useEffect(() => {
    if (viewType === 'preview') {
      setTree(doc?.getSchemaTree() || undefined)
    }
  }, [doc, viewType])

  return (
    <ThemeProvider theme={theme}>
      {
        tree &&
        <PreviewRoot
          components={components}
          reactionMaterials={reactionMaterials}
        >
          <Fieldy>
            <VirtualForm>
              <ComponentRender
                root={tree}
              />
            </VirtualForm>
          </Fieldy>
        </PreviewRoot>
      }
    </ThemeProvider>
  )
})