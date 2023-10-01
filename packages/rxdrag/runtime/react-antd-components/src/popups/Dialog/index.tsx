import { Modal, ModalProps } from "antd"
import { memo } from "react"

export const Dialog = memo((
  props: ModalProps
) => {
  const { footer, ...rest } = props
  return (
    <Modal footer={footer || false} {...rest} />
  )
})