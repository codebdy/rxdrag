import { Button, Space, Tooltip } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo } from "react"
import { moveIcon, selectionIcon } from "../icons"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"

export const SelectionButtions = memo(() => {
  const t = useToolsTranslate()

  return (
    <Space>
      <Tooltip title={t("pointSelection")}>
        <Button type="text" size="small" icon={
          <SvgIcon>
            {moveIcon}
          </SvgIcon>
        } />
      </Tooltip>
      <Tooltip title={t("boxSelection")}>
        <Button type="text" size="small" icon={
          <SvgIcon>
            {selectionIcon}
          </SvgIcon>
        } />
      </Tooltip>
    </Space>
  )
})