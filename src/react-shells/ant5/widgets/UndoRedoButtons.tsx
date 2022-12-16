import { Button, Space, Tooltip } from "antd"
import { useRedo } from "core-react/hooks/useRedo"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { useUndo } from "core-react/hooks/useUndo"
import { memo } from "react"
import { redoIcon, undoIcon } from "../icons"
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