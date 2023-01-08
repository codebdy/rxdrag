import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useToken } from "antd/es/theme/internal";
import { RXID_ATTR_NAME } from "core";
import { useDesignerEngine } from "core-react/hooks";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useDocument } from "core-react/hooks/useDocument";
import { useNode } from "core-react/hooks/useNode";
import { DrawerProps } from "expamples/ant5/components/popups/Drawer";
import { forwardRef, memo, useCallback, useMemo, useRef, useState } from "react"
import { CloseButton } from "../../CloseButton";
import { PopupButton } from "../../PopupButton";
import "./style.less"

export const DrawerDesigner = memo(forwardRef<HTMLDivElement>((props: DrawerProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    title,
    closable = true,
    destroyOnClose,
    keyboard,
    mask,
    maskClosable,
    content,
    footer,
    actionComponent,
    placement = "right",
    height = 378,
    width = 378,
    extra,
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
    setHover(false)
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
    setHover(false)
  }, [])

  const realWidth = useMemo(() => {
    if (placement === "top" || placement === "bottom") {
      return "100%"
    }
    return width
  }, [placement, width])

  const realHeight = useMemo(() => {
    if (placement === "right" || placement === "left") {
      return "100%"
    }
    return height
  }, [height, placement])

  const position = useMemo(() => {
    if (placement === "left") {
      return {
        top: 0,
        left: 0,
        right: 'auto',
      }
    }

    if (placement === "top") {
      return {
        top: 0,
        left: 0,
        bottom: 'auto',
      }
    }


    if (placement === "bottom") {
      return {
        top: 'auto',
        bottom: 0,
        left: 0,
      }
    }


    return {
      top: 0,
      right: 0,
      left: 'auto',
    }
  }, [placement])

  const closePosition = useMemo(() => {
    if (placement === "right") {
      return {
        top: 1,
        left: -18,
        right: 'auto',
      }
    }
    if (placement === "left") {
      return {
        top: 1,
        right: -18,
        left: 'auto',
      }
    }

    if (placement === "top") {
      return {
        top: height,
        left: 0,
      }
    }

    return {
      bottom: height,
      left: 0,
    }

  }, [height, placement])

  const closeMargin = useMemo(() => {
    if (placement === "bottom") {
      return {
        marginTop: -6
      }
    }
    if (placement === "top") {
      return {
        marginTop: 1
      }
    }
    return {}
  }, [placement])

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
          <div className='rx-drawer-wrap'
            style={{
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
            }}
          >
            <div
              className='rx-drawer-content'
              style={{
                width: realWidth,
                background: token.colorBgContainer,
                height: realHeight,
                ...position,
              }}
              {...!open ? {} : { [RXID_ATTR_NAME]: rxId }}
            >
              <div
                className='drawer-header'
                style={{
                  borderBottom: `${token.colorBorder} solid 1px`,
                }}
              >
                <div className="drawer-header-title">
                  {
                    closable &&
                    <Button type='text' className="drawer-close">
                      <CloseOutlined />
                    </Button>
                  }
                  {title}
                  {extra}
                </div>
              </div>
              <div className="drawer-body">
                {content}
              </div>
              <div
                className="drawer-footer"
                style={{ borderTop: `${token.colorBorder} solid 1px`, }}
              >
                {footer && footer}
              </div>

              <CloseButton
                style={{
                  ...closePosition,
                  ...closeMargin,
                }}
                onClick={handleClose}
              />
            </div>
          </div>
        </>
      }
    </div>
  )
}))