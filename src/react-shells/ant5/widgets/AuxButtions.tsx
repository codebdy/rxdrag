import { Button, Space, Tooltip } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo } from "react"
import { lineIcon, marginIcon } from "../icons"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"

export const AuxButtionsButtions = memo(() => {
  const t = useToolsTranslate()
  return (
    <Space>
      <Tooltip title={t("auxLine")}>
        <Button type="text" size="small" icon={
          <SvgIcon>
            {lineIcon}
          </SvgIcon>
        } />
      </Tooltip>
      <Tooltip title={t("auxMargin")}>
        <Button type="text" size="small" icon={
          <SvgIcon>
            {marginIcon}
          </SvgIcon>
        } />
      </Tooltip>
    </Space>
  )
})