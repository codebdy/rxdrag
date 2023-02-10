import { useToken } from "antd/es/theme/internal"
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState"
import { IComponents } from "core-react/interfaces"
import { PreviewRoot } from "core-react/PreviewRoot"
import { IDocument, INodeSchema } from "core/interfaces"
import { memo, useEffect, useMemo, useState } from "react"
import { ComponentRender } from "runner/ComponentRender"
import { extractFieldSchemas } from "runner/ComponentRender/funcs/extractFieldSchemas"
import { Fieldy, VirtualForm } from "runner/fieldy"
import { IReactionMaterial } from "runner/reaction"
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

  const fieldSchemas = useMemo(() => {
    return tree ? extractFieldSchemas(tree) : []
  }, [tree])


  return (
    <ThemeProvider theme={theme}>
      <PreviewRoot
        components={components}
        reactionMaterials={reactionMaterials}
      >
        <Fieldy>
          <VirtualForm
            fieldSchemas={fieldSchemas}
          >
            {
              tree &&
              <ComponentRender
                root={tree}
              />
            }
          </VirtualForm>
        </Fieldy>
      </PreviewRoot>
    </ThemeProvider>
  )
})