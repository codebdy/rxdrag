import { Divider } from "antd"
import { IDocument } from "core"
import { IframeCanvas } from "core-react/canvas/IframeCanvas"
import { DocumentRoot } from "core-react/DocumentRoot"
import { JsonView } from "core-react/JsonView"
import { IframePreview } from "core-react/Preview"
import { memo } from "react"
import { CanvasToolbar } from "react-shells/ant5/layouts/CanvasToolbar"
import { AuxButtionsButtions } from "react-shells/ant5/widgets/AuxButtions"
import { CanvasSize } from "react-shells/ant5/widgets/CanvasSize"
import { NavbarWidget } from "react-shells/ant5/widgets/NavbarWidget"
import { SelectionButtions } from "react-shells/ant5/widgets/SelectionButtions"
import { UndoRedoButtons } from "react-shells/ant5/widgets/UndoRedoButtons"
import { ViewButtons } from "react-shells/ant5/widgets/ViewButtons"
import { Viewport } from "../Viewport"

export const DocumentView = memo((
  props: {
    doc?: IDocument,
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { doc, canvasUrl, previewUrl } = props

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