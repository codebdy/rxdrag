import { IDocument } from "@rxdrag/core"
import { DocumentRoot, JsonView, IframeCanvas } from "@rxdrag/react-core"
import { Divider } from "antd"
import { memo } from "react"
import { IframePreview } from "../../components/Preview/IframePreview"
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
          <IframeCanvas doc={doc} renderUrl={canvasUrl} />
          <IframePreview doc={doc} renderUrl={previewUrl} />
        </Viewport>
        <NavbarWidget />
      </DocumentRoot>
      : <></>
  )
})