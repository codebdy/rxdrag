import { IDocument } from "@rxdrag/core"
import { CanvasShell, DocumentRoot, IFrame, JsonView, useDocumentViewTypeState } from "@rxdrag/react-core"
import { Divider } from "antd"
import { memo } from "react"
import { CanvasToolbar } from "../../layouts"
import { UndoRedoButtons, SelectionButtions, AuxButtionsButtions, CanvasSize, ViewButtons, NavbarWidget } from "../../widgets"
import { Viewport } from "../Viewport"

export const DocumentView = memo((
  props: {
    doc?: IDocument,
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { doc, canvasUrl, previewUrl } = props
  console.log(doc?.getSchemaTree(), 'doc1')
  const [viewType] = useDocumentViewTypeState(doc?.id)

  return (
    doc ?
      <DocumentRoot doc={doc}>
        <CanvasToolbar>
          <UndoRedoButtons />
          <Divider type="vertical" style={{ height: 16 }} />
          <SelectionButtions />
          <Divider type="vertical" style={{ height: 16 }} />
          <AuxButtionsButtions />
          <Divider type="vertical" style={{ height: 16 }} />
          <CanvasSize />
          <div style={{ flex: 1 }}></div>

          <ViewButtons />
        </CanvasToolbar>
        <Viewport>
          <JsonView />
          <CanvasShell display={viewType === "design"} >
            <IFrame
              style={{ border: "0", width: "100%", height: "100%" }}
              src={canvasUrl}
            />
          </CanvasShell>
          <CanvasShell display={viewType === "preview"} >
            <IFrame
              style={{ border: "0", width: "100%", height: "100%" }}
              src={previewUrl}
            />
          </CanvasShell>
        </Viewport>
        <NavbarWidget />
      </DocumentRoot>
      : <></>
  )
})