import { useUndo, useRedo, useToolsTranslate } from "@rxdrag/react-core"
import { undoIcon, redoIcon } from "@rxdrag/react-shared"
import { Button, Space, Tooltip } from "antd"
import { memo } from "react"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"

export const UndoRedoButtons = memo(() => {
  const [canUndo, undo] = useUndo()
  const [canRedo, redo] = useRedo()
  const t = useToolsTranslate()
  return (
    <Space>
      <Tooltip title={t("undo")}>
        <Button
          size="small"
          type="text"
          icon={
            <SvgIcon>
              {undoIcon}
            </SvgIcon>
          }
          disabled={!canUndo}
          onClick={undo}
        />
      </Tooltip>
      <Tooltip title={t("redo")}>
        <Button
          size="small"
          type="text"
          icon={
            <SvgIcon>
              {redoIcon}
            </SvgIcon>
          }
          disabled={!canRedo}
          onClick={redo}
        />
      </Tooltip>
    </Space>
  )
})