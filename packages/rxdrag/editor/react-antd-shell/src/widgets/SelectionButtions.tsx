import { DocumentSelectionMode } from "@rxdrag/core"
import { useSelectionModeState, useToolsTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo, useCallback } from "react"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"
import { moveIcon, selectionIcon } from "../icons"

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