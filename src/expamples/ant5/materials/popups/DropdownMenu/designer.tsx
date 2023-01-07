import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useComponentTranslate } from "core-react/hooks/useComponentTranslate"
import { memo } from "react"
import "./style.less"

export type DropdownMenuProps = {
  children?: React.ReactNode
}
export const DropdownMenuDesigner = memo((props: DropdownMenuProps) => {
  const { children, ...other } = props
  const t = useComponentTranslate("DropdownMenu")

  return (
    <div className="rx-dropdown-menu-designer" {...other}>
      {children}
      <div style={{ padding: 8, boxSizing: "border-box" }}>
        <Button block type="dashed" size="small" icon={<PlusOutlined />} >
          {t('addItem')}
        </Button>
      </div>
    </div>
  )
})