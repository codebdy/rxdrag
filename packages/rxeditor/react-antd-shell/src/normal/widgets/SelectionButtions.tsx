import { DocumentSelectionMode } from "@rxdrag/core"
import { useSelectionModeState, useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo, useCallback } from "react"
import { SvgIcon } from "../../common/SvgIcon"
import { moveIcon, selectionIcon } from "@rxdrag/react-shared"

export const SelectionButtions = memo(() => {
  const [selectionMode, setSelectionMode] = useSelectionModeState()
  const t = useSettersTranslate()

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