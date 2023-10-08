import { useController } from "@rxdrag/react-runner"
import { Modal, ModalProps } from "antd"
import { memo, useCallback } from "react"

export const Dialog = memo((
  props: ModalProps
) => {
  const { footer, open, ...rest } = props
  const ctrl = useController()
  const handleClose = useCallback(() => {
    ctrl?.setProp("open", false)
  }, [ctrl])

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={footer || false}
      {...rest}
    />
  )
})