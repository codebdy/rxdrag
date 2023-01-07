import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { HistoryableActionType, NodeRelativePosition } from "core"
import { useComponentTranslate } from "core-react/hooks/useComponentTranslate"
import { useDocument } from "core-react/hooks/useDocument"
import { useNode } from "core-react/hooks/useNode"
import { forwardRef, memo, useCallback } from "react"
import "./style.less"

export type DropdownMenuProps = {
  children?: React.ReactNode
}
export const DropdownMenuDesigner = memo(forwardRef<HTMLDivElement>((props: DropdownMenuProps, ref) => {
  const { children, ...other } = props
  const t = useComponentTranslate("DropdownMenu")
  const doc = useDocument()
  const node = useNode()
  const handleAdd = useCallback(() => {
    if (doc && node) {
      doc.addNewNodes(
        {
          componentName: "DropdownMenuItem",
          props: {
            title: "New Item"
          }
        },
        node.id,
        NodeRelativePosition.InBottom,
      )
      doc.backup(HistoryableActionType.Add)
    }
  }, [doc, node])

  return (
    <div className="rx-dropdown-menu-designer" ref={ref} {...other}>
      {children}
      <div style={{ padding: 8, boxSizing: "border-box" }}>
        <Button block type="dashed" size="small" icon={<PlusOutlined />} onClick={handleAdd}>
          {t('add')}
        </Button>
      </div>
    </div>
  )
}))