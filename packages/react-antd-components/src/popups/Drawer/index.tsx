import { useController } from "@rxdrag/react-runner"
import { Drawer as AntdDrawer, DrawerProps } from "antd"
import { memo, useCallback } from "react"

export const Drawer = memo((
  props: DrawerProps
) => {
  const { footer, open, ...rest } = props
  const ctrl = useController()
  const handleClose = useCallback(() => {
    ctrl?.setProp("open", false)
  }, [ctrl])

  return (
    <AntdDrawer
      open={open}
      onClose={handleClose}
      footer={footer || false}
      {...rest}
    />
  )
})