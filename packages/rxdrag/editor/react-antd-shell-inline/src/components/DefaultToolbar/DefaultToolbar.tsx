import { ReactElement, memo, useMemo } from "react"
import { Button, Divider, Space } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"
import { UndoButton } from "./UndoButton"
import { RedoButton } from "./RedoButton"
import { MultiSelectionButton } from "./MultiSelectionButton"
import { AuxLineButton } from "./AuxLineButton"
import { AuxMarginButton } from "./AuxMarginButton"
import { DesignButton } from "./DesignButton"
import { JSONButton } from "./JSONButton"
import { PreviewButton } from "./PreviewButton"

export enum ToolbarButton {
  undo = "undo",
  redo = "redo",
  multiSelection = "multiSelection",
  auxLine = "auxLine",
  auxMargin = "auxMargin",
  design = "design",
  priview = "priview",
  divider = "divider"
}

export const DefaultToolbar = memo((
  props: {
    buttons?: (ToolbarButton | ReactElement)[]
  }
) => {
  const { buttons } = props
  const defualtButtons = useMemo(() => <>
    <UndoButton />
    <RedoButton />
    <Divider type="vertical" />
    <MultiSelectionButton />
    <AuxLineButton />
    <AuxMarginButton />
    <Divider type="vertical" />
    <DesignButton />
    <JSONButton />
    <PreviewButton />
    <Button
      type={"text"}
      size="large"
      icon={<EllipsisOutlined />}
    //onClick={handleRedo}
    />
  </>, [])

  return (
    <Space>
      {!buttons && defualtButtons}
    </Space>
  )
})