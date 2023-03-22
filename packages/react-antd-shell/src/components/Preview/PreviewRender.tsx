import { IDocument } from "@rxdrag/core"
import { useDocumentViewTypeState } from "@rxdrag/react-core"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender } from "@rxdrag/react-runner"
import { IComponents, PreviewRoot } from "@rxdrag/react-shared"
import { IReactionMaterial, INodeSchema } from "@rxdrag/schema"
import { useToken } from "antd/es/theme/internal"
import { memo, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"
import { Minions } from "@rxdrag/react-minions"

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
        >
          <Minions materials={reactionMaterials}>
            <Fieldy>
              <VirtualForm>
                <ComponentRender
                  root={tree}
                />
              </VirtualForm>
            </Fieldy>
          </Minions>
        </PreviewRoot>
      }
    </ThemeProvider>
  )
})