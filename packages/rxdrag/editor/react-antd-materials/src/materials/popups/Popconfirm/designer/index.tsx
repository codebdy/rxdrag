import React, { forwardRef, memo, useCallback, useRef, useState } from "react"
import { PopupButton } from "../../PopupButton";
import { Popconfirm, PopconfirmProps } from "antd"
import { CloseButton } from "../../CloseButton";
import { RXID_ATTR_NAME } from "@rxdrag/core";
import { useNode, useCurrentNode, useDesignerEngine, useDocument } from "@rxdrag/react-core";

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
  const popupRef = useRef<HTMLDivElement | null>(null);
  const engine = useDesignerEngine()
  const doc = useDocument()
  const refreshSelect = useCallback((time = 20) => {
    if (doc && node) {
      setTimeout(() => {
        engine?.getActions().selectNodes([node.id])
      }, time)
    }
  }, [doc, engine, node])

  const addRxdToPop = useCallback(() => {
    popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "")
  }, [rxId])

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleShow = useCallback(() => {
    setOpen(true);
    setHover(false)
    addRxdToPop()
    //有动画，需要长延时
    refreshSelect(300)
  }, [addRxdToPop, refreshSelect])

  const handleClose = useCallback(() => {
    setOpen(false)
    popupRef.current?.removeAttribute(RXID_ATTR_NAME)
    refreshSelect()
  }, [refreshSelect])

  const handlePopRefChange = useCallback((popEl: HTMLElement | null) => {
    const els = realRef.current?.ownerDocument.getElementsByClassName("ant-popover-content")
    for (let i = 0; i < (els?.length || 0); i++) {
      const el = els?.[i]
      if (el && el.contains(popEl)) {
        popupRef.current = el as HTMLDivElement
      }
    }
    addRxdToPop()
  }, [addRxdToPop])

  return (
    <div
      ref={realRef}
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
            <div ref={handlePopRefChange}></div>
          </>
        }
        description={description}
        okText={okText}
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