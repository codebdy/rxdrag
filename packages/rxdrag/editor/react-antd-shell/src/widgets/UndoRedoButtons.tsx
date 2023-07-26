import { useUndo, useRedo, useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo } from "react"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"
import { undoIcon, redoIcon } from "../icons"

export const UndoRedoButtons = memo(() => {
  const [canUndo, undo] = useUndo()
  const [canRedo, redo] = useRedo()
  const t = useSettersTranslate()
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