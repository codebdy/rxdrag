import { RXID_ATTR_NAME } from "@rxdrag/core";
import { DialogGroupProps } from "@rxdrag/react-antd-components";
import { useNode, useCurrentNode, useDesignerEngine, useDocument } from "@rxdrag/react-core";
import { Modal } from "antd";
import { forwardRef, memo, useCallback, useRef, useState } from "react"
import { CloseButton } from "../../CloseButton";
import { PopupButton } from "../../PopupButton";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogGroupDesigner = memo(forwardRef<HTMLDivElement>((props: DialogGroupProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    title,
    content,
    footer,
    actionComponent,
    style,
    closable,
    [RXID_ATTR_NAME]: rxId,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const node = useNode()
  const currentNode = useCurrentNode();
  const realRef = useRef<HTMLDivElement | null>(null);
  const engine = useDesignerEngine()
  const doc = useDocument()
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const refreshSelect = useCallback((time = 20) => {
    if (doc && node) {
      setTimeout(() => {
        engine?.getActions().selectNodes([node.id])
      }, time)
    }
  }, [doc, engine, node])

  const getModalEl = useCallback(() => {
    return realRef.current?.getElementsByClassName("ant-modal-content")?.[0]
  }, [])
  const addRxdToPop = useCallback(() => {
    popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "")
  }, [rxId])

  const handleShow = useCallback(() => {
    setOpen(true);
    addRxdToPop()
    refreshSelect(300)
  }, [addRxdToPop, refreshSelect])

  const handleClose = useCallback(() => {
    setOpen(false)
    popupRef.current?.removeAttribute(RXID_ATTR_NAME)
  }, [])

  const handleAfterClose = useCallback(() => {
    refreshSelect()
  }, [refreshSelect])
  const handlePopRefChange = useCallback(() => {
    popupRef.current = getModalEl() as HTMLDivElement
    addRxdToPop()
  }, [addRxdToPop, getModalEl])

  return (
    <div
      ref={realRef}
      style={{ display: "inline-block", position: "relative", ...style }}
      {...open ? {} : { [RXID_ATTR_NAME]: rxId }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {actionComponent}
      {
        (hover || currentNode?.id === node?.id) && !open && <PopupButton onClick={handleShow} />
      }
      <Modal
        title={title}
        open={open}
        footer={footer || false}
        closable={closable}
        onCancel={handleClose}
        afterClose={handleAfterClose}
        getContainer={realRef.current ? () => realRef.current as HTMLDivElement : undefined}
        {...other}>
        {content}
        {
          closable === false &&
          <CloseButton onClick={handleClose} />
        }
        <div ref={handlePopRefChange}></div>
      </Modal>

    </div>
  )
}))