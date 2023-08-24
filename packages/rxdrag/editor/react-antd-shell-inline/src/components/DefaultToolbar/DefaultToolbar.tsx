import { memo } from "react"
import { Button, Divider, Space } from "antd"
import { lineIcon, marginIcon, moveIcon, designIcon, jsonIcon, playIcon } from "../../icons"
import { EllipsisOutlined } from "@ant-design/icons"
import { UndoButton } from "./UndoButton"
import { RedoButton } from "./RedoButton"

export enum ToolbarButton {
  undo = "undo",
  redo = "redo",
  multiSelect = "multiSelect",
  auxLine = "auxLine",
  auxMargin = "auxMargin",
  design = "design",
  priview = "priview",
  divider = "divider"
}

export const DefaultToolbar = memo((
  props: {
    buttons?: ToolbarButton[]
  }
) => {
  const { buttons = [ToolbarButton.undo, ToolbarButton.redo] } = props
  return (
    <Space>
      <UndoButton />
      <RedoButton />
      <Divider type="vertical" />
      <Button
        type={"text"}
        size="large"
        //disabled={redoList.length === 0}
        icon={moveIcon}
      //onClick={handleRedo}
      />
      <Button
        type={"text"}
        size="large"
        //disabled={redoList.length === 0}
        icon={lineIcon}
      //onClick={handleRedo}
      />
      <Button
        type={"text"}
        size="large"
        //disabled={redoList.length === 0}
        icon={marginIcon}
      //onClick={handleRedo}
      />
      <Divider type="vertical" />
      <Button
        type={"text"}
        size="large"
        icon={designIcon}
      //onClick={handleRedo}
      />
      <Button
        type={"text"}
        size="large"
        icon={jsonIcon}
      //onClick={handleRedo}
      />
      <Button
        type={"text"}
        size="large"
        icon={playIcon}
      //onClick={handleRedo}
      />
      <Button
        type={"text"}
        size="large"
        icon={<EllipsisOutlined />}
      //onClick={handleRedo}
      />
    </Space>
  )
})