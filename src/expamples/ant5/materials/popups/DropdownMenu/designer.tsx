import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useComponentTranslate } from "core-react/hooks/useComponentTranslate"
import { forwardRef, memo, useCallback } from "react"
import "./style.less"

export type DropdownMenuProps = {
  children?: React.ReactNode
}
export const DropdownMenuDesigner = memo(forwardRef<HTMLDivElement>((props: DropdownMenuProps, ref) => {
  const { children, ...other } = props
  const t = useComponentTranslate("DropdownMenu")

  const handleAdd = useCallback(()=>{

  }, [])

  return (
    <div className="rx-dropdown-menu-designer" ref={ref} {...other}>
      {children}
      <div style={{ padding: 8, boxSizing: "border-box" }}>
        <Button block type="dashed" size="small" icon={<PlusOutlined />} onClick={handleAdd}>
          {t('addItem')}
        </Button>
      </div>
    </div>
  )
}))