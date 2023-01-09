import { Modal } from "antd";
import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { DialogProps } from "expamples/ant5/components/popups/Dialog";
import { forwardRef, memo, useCallback, useRef, useState } from "react"
import { CloseButton } from "../../CloseButton";
import { PopupButton } from "../../PopupButton";

export const DialogDesigner = memo(forwardRef<HTMLDivElement>((props: DialogProps & { [RXID_ATTR_NAME]?: string }, ref) => {
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

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleShow = useCallback(() => {
    setOpen(true);
    if (doc && node) {
      engine?.getActions().selectNodes([node.id], doc.id)
    }
  }, [doc, engine, node])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    realRef.current = node;
    // if (typeof ref === 'function') {
    //   ref(node);
    // } else if (ref) {
    //   ref.current = node;
    // }
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div
      ref={handleRefChange}
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
        footer={footer}
        closable={closable}
        onCancel={handleClose}
        getContainer={realRef.current ? () => realRef.current as any : undefined}
        {...other}>
        {content}
        {
          closable === false &&
          <CloseButton onClick={handleClose} />
        }

      </Modal>

    </div>
  )
}))