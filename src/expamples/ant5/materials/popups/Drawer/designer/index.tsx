import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useToken } from "antd/es/theme/internal";
import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { DialogProps } from "expamples/ant5/components/popups/Dialog";
import { forwardRef, memo, useCallback, useRef, useState } from "react"
import { CloseButton } from "../../CloseButton";
import { PopupButton } from "../../PopupButton";
import "./style.less"

export const DrawerDesigner = memo(forwardRef<HTMLDivElement>((props: DialogProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    title,
    width = 520,
    centered,
    closable = true,
    destroyOnClose,
    focusTriggerAfterClose,
    keyboard,
    mask,
    maskClosable,
    content,
    footer,
    changeRemind,
    actionComponent,
    style,
    [RXID_ATTR_NAME]: rxId,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const node = useNode()
  const currentNode = useCurrentNode();
  const realRef = useRef<HTMLDivElement | null>(null);
  const [, token] = useToken()
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
      {...other}
      {...open ? {} : { [RXID_ATTR_NAME]: rxId }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {actionComponent}
      {
        (hover || currentNode?.id === node?.id) && !open && <PopupButton onClick={handleShow} />
      }
      {open &&
        <>
          <div className='rx-drawer-mask'
            style={{
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
            }}
          >
          </div>
          <div className='rx-dialog-wrap'
            style={{
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
              alignItems: centered ? "center" : "flex-start",
            }}
          >
            <div
              className='rx-dialog-content'
              style={{
                width: width,
                background: token.colorBgContainer,
                marginTop: centered ? undefined : 100,
                maxHeight: 'calc(100% - 200px)',
              }}
              {...!open ? {} : { [RXID_ATTR_NAME]: rxId }}
            >
              <div style={{
                flex: 1,
                height: 0,
                overflow: "auto",
              }}>
                {
                  closable &&
                  <Button type='text' className="dialog-close">
                    <CloseOutlined />
                  </Button>
                }

                <div className='dialog-header'>
                  <div className='dialog-title'>
                    {title}
                  </div>
                </div>
                <div className="dialog-body">
                  {content}
                </div>
                <div className="dialog-footer">
                  {footer && footer}
                </div>
              </div>
              <CloseButton
                onClick={handleClose}
              />
            </div>
          </div>
        </>
      }
    </div>
  )
}))