import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useToken } from "antd/es/theme/internal";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useNode } from "core-react/hooks/useNode";
import { DialogProps } from "expamples/ant5/components/popups/Dialog";
import { forwardRef, memo, useCallback, useRef, useState } from "react"
import { PopupButton } from "../../PopupButton";
import "./style.less"

export const DialogDesigner = memo(forwardRef<HTMLDivElement>((props: DialogProps, ref) => {
  const {
    title,
    icon,
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
    ...other
  } = props;

  const [visible, setVisiable] = useState(false);
  const [hover, setHover] = useState(false);
  const node = useNode()
  const currentNode = useCurrentNode();
  const realRef = useRef<HTMLDivElement | null>(null);
  const [, token] = useToken()

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleShow = useCallback(() => {
    setVisiable(true);
  }, [])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    realRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref])

  const handleClose = useCallback(() => {
    setVisiable(false)
  }, [])

  return (
    <div
      ref={handleRefChange}
      style={{ display: "inline-block", position: "relative", ...style }}
      {...other}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {actionComponent}
      {
        (hover || currentNode?.id === node?.id) && !visible && <PopupButton onClick={handleShow} />
      }
      {visible &&
        <>
          <div className='rx-dialog-mask'
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
            >
              <div style={{
                flex: 1,
                height: 0,
                overflow: "auto",
              }}>
                {
                  closable &&
                  <Button type='text' className="dialog-close" onClick={handleClose}>
                    <CloseOutlined />
                  </Button>
                }

                <div className='dialog-header'>
                  <div className='dialog-title'>
                    {title}
                  </div>
                </div>
                {content}
                {footer && footer}
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}))