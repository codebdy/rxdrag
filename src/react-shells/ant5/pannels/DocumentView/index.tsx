import { Divider, Select, Space } from "antd"
import { useToken } from "antd/es/theme/internal"
import { IDocument } from "core"
import { ShadowDomCanvas } from "core-react/canvas/ShadowDomCanvas"
import { DocumentRoot } from "core-react/DocumentRoot"
import { JsonView } from "core-react/JsonView"
import { Preview } from "core-react/Preview"
import { memo } from "react"
import { CanvasToolbar } from "react-shells/ant5/layouts/CanvasToolbar"
import { CanvasSize } from "react-shells/ant5/widgets/CanvasSize"
import { NavbarWidget } from "react-shells/ant5/widgets/NavbarWidget"
import { SelectionButtions } from "react-shells/ant5/widgets/SelectionButtions"
import { UndoRedoButtons } from "react-shells/ant5/widgets/UndoRedoButtons"
import { ViewButtons } from "react-shells/ant5/widgets/ViewButtons"
import { Viewport } from "../Viewport"

export const DocumentView = memo((
  props: {
    doc?: IDocument,
  }
) => {
  const { doc } = props
  const [, token] = useToken()
  return (
    doc ?
      <DocumentRoot doc={doc}>
        <CanvasToolbar>
          <UndoRedoButtons />
          <Divider type="vertical" style={{ height: 16 }} />
          <SelectionButtions />
          <Divider type="vertical" style={{ height: 16 }} />
          <CanvasSize />
          <div style={{ flex: 1 }}></div>
          <Space>
            <Select
              size="small"
              defaultValue="page"
              options={[
                {
                  value: 'frame',
                  label: '框架',
                },
                {
                  value: 'page',
                  label: '页面',
                },
              ]}
            />
            <Divider type="vertical" />
            <ViewButtons />
          </Space>
        </CanvasToolbar>
        <Viewport>
          <JsonView />
          <ShadowDomCanvas backgroundColor={token.colorBgBase} />
          <Preview backgroundColor={token.colorBgBase} />
        </Viewport>
        <NavbarWidget />
      </DocumentRoot>
      : <></>
  )
})