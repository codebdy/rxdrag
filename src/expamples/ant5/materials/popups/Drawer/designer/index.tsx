import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { DrawerProps } from "expamples/ant5/components/popups/Drawer";
import { forwardRef, memo, useCallback, useRef, useState } from "react"
import { PopupButton } from "../../PopupButton";
import { Drawer as AntdDrawer } from "antd"
import "./style.less"
import { NodeMountedEvent } from "core/shell/events/canvas/NodeMountedEvent";
import { NodeUnmountedEvent } from "core/shell/events/canvas/NodeUnmountedEvent";

export const DrawerDesigner = memo(forwardRef<HTMLDivElement>((props: DrawerProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    title,
    content,
    footer,
    actionComponent,
    extra,
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
    setHover(false)

  }, [doc, engine, node])

  const removeTaggleRxid = useCallback(()=>{
    const el = realRef.current?.getElementsByClassName("ant-drawer-content-wrapper")?.[0]
    if(open){
      el?.setAttribute(RXID_ATTR_NAME, rxId || "")
    }else{
      el?.removeAttribute(RXID_ATTR_NAME)
    }
  }, [open, rxId])

  const handleOpenChange = useCallback(() => {
    removeTaggleRxid()
    engine?.getShell().dispatch(new NodeMountedEvent())
  }, [engine, removeTaggleRxid])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    realRef.current = node;
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setHover(false)
    const el = realRef.current?.getElementsByClassName("ant-drawer-content-wrapper")?.[0]
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
      {actionComponent}
      {
        (hover || currentNode?.id === node?.id) && !open && <PopupButton onClick={handleShow} />
      }
      <AntdDrawer
        open={open}
        getContainer={realRef.current ? () => realRef.current as any : undefined}
        {...!open ? {} : { [RXID_ATTR_NAME]: rxId }}
        title={title}
        extra={extra}
        footer={footer}
        afterOpenChange={handleOpenChange}
        onClose = {handleClose}
        {...other}
      >
        {content}
      </AntdDrawer>
    </div>
  )
}))