import { IDocument } from "@rxdrag/core"
import { useDocumentViewTypeState } from "@rxdrag/react-core"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender, } from "@rxdrag/react-runner"
import { ControllerFactories } from "@rxdrag/react-runner"
import { IReactComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { useToken } from "antd/es/theme/internal"
import { memo, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

export const PreviewRender = memo((
  props: {
    components?: IReactComponents
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

  console.log("刷新 PreviewRender", tree)

  return (
    <ThemeProvider theme={theme}>
      {
        tree && viewType === "preview" &&
        <Fieldy>
          <VirtualForm>
            <ComponentRender
              root={tree}
              components={components}
              controllerFactories = {controllerFactories}
            />
          </VirtualForm>
        </Fieldy>
      }
    </ThemeProvider>
  )
})