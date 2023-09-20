import { DirectoryTreeProps } from "antd/es/tree"
import { Key, memo, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { LeftDrawer } from "./LeftDrawer"

export const MenusDrawer = memo((
  props: {
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { title, open, onOpenChange } = props
  const { moduleId } = useParams()
  const device = useAppFrontend()?.deviceType
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: Key[], root: any) => {
    if (root.node.children) {
      return
    }
    const id = keys?.[0].toString() || ""
    navigate("modules/" + id)
    onOpenChange?.(false)
  }, [navigate, onOpenChange]);

  return (
    <LeftDrawer
      title={title}
      open={open}
      onOpenChange={onOpenChange}
    >
      哈哈 MenusDrawer
    </LeftDrawer>
  )
})