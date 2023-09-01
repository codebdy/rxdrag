import { IDocument } from "@rxdrag/core"
import { CanvasShell, DocumentRoot, IFrame, JsonView, useDocumentViewTypeState } from "@rxdrag/react-core"
import { Divider } from "antd"
import { memo } from "react"
import { CanvasToolbar } from "../../layouts"
import { UndoRedoButtons, SelectionButtions, AuxButtions, CanvasSize, ViewButtons } from "../../widgets"
import { Viewport } from "../Viewport"
import { NavbarWidget } from "../../../common"
import { useCanvasUrl, usePreviewUrl } from "../../../common"

export const DocumentView = memo((
  props: {
    doc?: IDocument,
  }
) => {
  const { doc } = props
  console.log(doc?.getSchemaTree(), 'doc1')
  const [viewType] = useDocumentViewTypeState(doc?.id)

  const canvasUrl = useCanvasUrl()
  const previewUrl = usePreviewUrl()

  return (
    doc ?
      <DocumentRoot doc={doc}>
        <CanvasToolbar>
          <UndoRedoButtons />
          <Divider type="vertical" style={{ height: 16 }} />
          <SelectionButtions />
          <Divider type="vertical" style={{ height: 16 }} />
          <AuxButtions />
          <Divider type="vertical" style={{ height: 16 }} />
          <CanvasSize />
          <div style={{ flex: 1 }}></div>

          <ViewButtons />
        </CanvasToolbar>
        <Viewport>
          {
            viewType === "json" && <JsonView />
          }

          <CanvasShell display={viewType === "design"} >
            <IFrame
              doc={doc}
              src={canvasUrl}
            />
          </CanvasShell>
          <CanvasShell display={viewType === "preview"} >
            <IFrame
              doc={doc}
              src={previewUrl}
            />
          </CanvasShell>
        </Viewport>
        <NavbarWidget />
      </DocumentRoot>
      : <></>
  )
})