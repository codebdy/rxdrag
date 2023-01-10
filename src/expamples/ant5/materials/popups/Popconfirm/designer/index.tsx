import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import React, { forwardRef, memo, useCallback, useRef, useState } from "react"
import { PopupButton } from "../../PopupButton";
import { Popconfirm, PopconfirmProps } from "antd"
import { NodeMountedEvent } from "core/shell/events/canvas/NodeMountedEvent";
import { CloseButton } from "../../CloseButton";
import { NodeUnmountedEvent } from "core/shell/events/canvas/NodeUnmountedEvent";

export type PopconfirmExtraProps = {
  [RXID_ATTR_NAME]?: string,
}

export const PopconfirmDesigner = memo(forwardRef<HTMLDivElement, PopconfirmProps & PopconfirmExtraProps>((props, ref) => {
  const {
    title,
    cancelText,
    okText,
    description,
    children,
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
    //setHover(false)

  }, [doc, engine, node])

  const taggleRxid = useCallback(() => {
    const el = realRef.current?.getElementsByClassName("ant-popover-content")?.[0]
    if (open) {
      el?.setAttribute(RXID_ATTR_NAME, rxId || "")
    } else {
      el?.removeAttribute(RXID_ATTR_NAME)
    }
  }, [open, rxId])

  const handleOpenChange = useCallback((open: boolean) => {
    //setOpen(open)
    taggleRxid()
    engine?.getShell().dispatch(new NodeMountedEvent())
  }, [engine, taggleRxid])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    realRef.current = node;
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    const el = realRef.current?.getElementsByClassName("ant-popover-content")?.[0]
    el?.removeAttribute(RXID_ATTR_NAME)
    engine?.getShell().dispatch(new NodeUnmountedEvent())
  }, [engine])

  return (
    <div
      ref={handleRefChange}
      style={{ display: "inline-block", position: "relative" }}
      {...open ? {} : { [RXID_ATTR_NAME]: rxId }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Popconfirm
        open={open}
        title={
          <>
            {title}
            {
              <CloseButton
                style={{
                  top: -24,
                  right: -30
                }}
                onClick={handleClose}
              />
            }
          </>
        }
        description={description}
        okText={okText}
        onOpenChange={handleOpenChange}
        cancelText={cancelText}
        {...other}
      >
        {children}
        {
          (hover || currentNode?.id === node?.id) && !open && <PopupButton onClick={handleShow} />
        }
      </Popconfirm>
    </div>
  )
}))