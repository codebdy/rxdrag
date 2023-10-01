import { RXID_ATTR_NAME } from "@rxdrag/core";
import { Modal, ModalProps } from "antd";
import { forwardRef, memo, useCallback, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogDesigner = memo(forwardRef<HTMLDivElement>((props: ModalProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    footer,
    children,
    [RXID_ATTR_NAME]: rxId,
    ...other
  } = props;
  const popupRef = useRef<HTMLDivElement | null>(null);

  const addRxdToPop = useCallback(() => {
    popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "")
  }, [rxId])

  const handlePopRefChange = useCallback((ele: HTMLDivElement) => {
    popupRef.current = ele?.parentElement?.parentElement as HTMLDivElement
    addRxdToPop()
  }, [addRxdToPop])

  return (
    <Modal footer={footer || false} {...other}>
      {children}
      <div ref={handlePopRefChange}></div>
    </Modal>
  )
}))