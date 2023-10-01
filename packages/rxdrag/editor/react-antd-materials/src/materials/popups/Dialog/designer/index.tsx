import { RXID_ATTR_NAME } from "@rxdrag/core";
import { Modal, ModalProps } from "antd";
import { forwardRef, memo, useCallback, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogDesigner = memo(forwardRef<HTMLDivElement>((props: ModalProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    children,
    [RXID_ATTR_NAME]: rxId,
    ...other
  } = props;
  const realRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const getModalEl = useCallback(() => {
    return realRef.current?.getElementsByClassName("ant-modal-content")?.[0]
  }, [])
  const addRxdToPop = useCallback(() => {
    popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "")
  }, [rxId])

  const handlePopRefChange = useCallback(() => {
    popupRef.current = getModalEl() as HTMLDivElement
    addRxdToPop()
  }, [addRxdToPop, getModalEl])

  return (
    <Modal {...other}>
      {children}
      <div ref={handlePopRefChange}></div>
    </Modal>
  )
}))