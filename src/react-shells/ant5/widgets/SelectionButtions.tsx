import { Button, Space, Tooltip } from "antd"
import { DocumentSelectionMode } from "core"
import { useSelectionModeState } from "core-react/hooks/useSelectionModeState"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo, useCallback } from "react"
import { moveIcon, selectionIcon } from "../icons"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"

export const SelectionButtions = memo(() => {
  const [selectionMode, setSelectionMode] = useSelectionModeState()
  const t = useToolsTranslate()

  const handlePointSelect = useCallback(() => {
    setSelectionMode(DocumentSelectionMode.Normal)
  }, [setSelectionMode])

  const handleRangeSelection = useCallback(() => {
    setSelectionMode(DocumentSelectionMode.RangeSelection)
  }, [setSelectionMode])


  return (
    <Space>
      <Tooltip title={t("pointSelection")}>
        <Button
          type={selectionMode === DocumentSelectionMode.Normal ? "default" : "text"}
          size="small"
          icon={
            <SvgIcon>
              {moveIcon}
            </SvgIcon>
          }
          onClick={handlePointSelect}
        />
      </Tooltip>
      <Tooltip title={t("boxSelection")}>
        <Button
          type={selectionMode === DocumentSelectionMode.RangeSelection ? "default" : "text"}
          size="small"
          icon={
            <SvgIcon>
              {selectionIcon}
            </SvgIcon>
          }
          onClick={handleRangeSelection}
        />
      </Tooltip>
    </Space>
  )
})