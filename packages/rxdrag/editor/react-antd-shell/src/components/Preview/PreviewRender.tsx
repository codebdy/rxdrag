import { IDocument } from "@rxdrag/core"
import { useDocumentViewTypeState } from "@rxdrag/react-core"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender, PreviewRoot } from "@rxdrag/react-runner"
import { IComponents } from "@rxdrag/react-shared"
import { IActivityMaterial, INodeSchema } from "@rxdrag/schema"
import { useToken } from "antd/es/theme/internal"
import { ReactNode, memo, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"
import { Minions } from "@rxdrag/react-minions"

export const PreviewRender = memo((
  props: {
    components?: IComponents
    doc?: IDocument,
    activityMaterials: IActivityMaterial<ReactNode>[]
  }
) => {
  const { components, doc, activityMaterials } = props
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
          <Minions materials={activityMaterials}>
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