import { IDocument } from "@rxdrag/core"
import { useDocumentViewTypeState } from "@rxdrag/react-core"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender, IComponentRenderSchema, RuntimeRoot } from "@rxdrag/react-runner"
import { ControllerFactories } from "@rxdrag/react-runner/src/RuntimeRoot/RuntimeEngine"
import { IComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { useToken } from "antd/es/theme/internal"
import { memo, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

export const PreviewRender = memo((
  props: {
    components?: IComponents
    doc?: IDocument,
    controllerFactories?: ControllerFactories,
  }
) => {
  const { components, doc, controllerFactories } = props
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
        tree && viewType === "preview" &&
        <RuntimeRoot
          components={components}
          schema={doc?.getSchemaTree() as IComponentRenderSchema}
          controllerFactories = {controllerFactories}
        >
          <Fieldy>
            <VirtualForm>
              <ComponentRender
                root={tree}
              />
            </VirtualForm>
          </Fieldy>
        </RuntimeRoot>
      }
    </ThemeProvider>
  )
})