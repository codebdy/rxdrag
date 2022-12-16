import { Button, Space } from "antd"
import { memo } from "react"
import { moveIcon, selectionIcon } from "../icons"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"

export const SelectionButtions = memo(() => {
  return (
    <Space>
      <Button type="text" size="small" icon={
        <SvgIcon>
          {moveIcon}
        </SvgIcon>
      } />
      <Button type="text" size="small" icon={
        <SvgIcon>
          {selectionIcon}
        </SvgIcon>
      } />
    </Space>
  )
})