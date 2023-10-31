import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import './styles.less'
import { useToken } from 'antd/es/theme/internal'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { CanvasScrollEvent, HistoryableActionType, NodeRelativePosition, RXID_ATTR_NAME } from '@rxdrag/core'
import { useDesignerEngine, useDocument, useNode, useCurrentNode, useComponentTranslate } from '@rxdrag/react-core'
import { CloseButton } from '../../CloseButton'
import { PopupButton } from '../../PopupButton'
import { DropdownProps } from '@rxdrag/react-antd-components'

export const DropdownDesigner = memo(forwardRef<HTMLDivElement>((props: DropdownProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const { placement = 'bottomLeft', actionComponent, style, arrow, [RXID_ATTR_NAME]: rxId, children, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const actionRef = useRef<HTMLDivElement | null>(null);
  const [placementStyle, setPlacementStyle] = useState<any>()
  const [hover, setHover] = useState(false);
  const [, token] = useToken()
  const engine = useDesignerEngine()
  const doc = useDocument()
  const node = useNode()
  const currentNode = useCurrentNode();
  const t = useComponentTranslate("Dropdown")

  const handleClose = useCallback(() => {
    setVisiable(false);
    if (doc && node) {
      engine?.getActions().selectNodes([node.id])
    }
    setTimeout(()=>{
      //engine?.getShell().dispatch(new NodeMountedEvent())
    }, 20)
  }, [doc, engine, node])

  const getPlacementStyle = useCallback(() => {
    //const actionRxId = node?.slots?.['actionComponent']
    const doc = actionRef?.current?.ownerDocument
    //const actionDom = doc?.querySelector(`[${RXID_ATTR_NAME}="${actionRxId}"]`)
    const rect = actionRef.current?.getBoundingClientRect();

    if (!rect || !doc) {
      return
    }
    switch (placement) {
      case "bottom":
        return {
          top: rect?.bottom,
          left: "auto",
          bottom: "auto",
          right: "auto",
          minWidth: rect.width,
        }
      case "bottomLeft":
        return {
          top: rect?.bottom,
          left: rect?.left,
          bottom: "auto",
          right: "auto",
          minWidth: rect.width,
        }
      case "bottomRight":
        return {
          top: rect?.bottom,
          right: doc.documentElement.clientWidth - rect?.right,
          left: "auto",
          bottom: "auto",
          minWidth: rect.width,
        }
      case "top":
        return {
          bottom: doc.documentElement.clientHeight - rect?.top,
          left: "auto",
          right: "auto",
          top: "auto",
          minWidth: rect.width,
        }
      case "topLeft":
        return {
          bottom: doc.documentElement.clientHeight - rect?.top,
          left: rect?.left,
          top: "auto",
          right: "auto",
          minWidth: rect.width,
        }
      case "topRight":
        return {
          bottom: doc.documentElement.clientHeight - rect?.top,
          right: doc.documentElement.clientWidth - rect?.right,
          left: "auto",
          top: "auto",
          minWidth: rect.width,
        }
    }
  }, [placement])

  const handleShow = useCallback(() => {
    setPlacementStyle(getPlacementStyle())
    setVisiable(true);
    if (doc && node) {
      engine?.getActions().selectNodes([node.id])
    }

    // setTimeout(()=>{
    //   //engine?.getShell().dispatch(new NodeMountedEvent())
    // }, 20)
  }, [doc, engine, getPlacementStyle, node])

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleScroll = useCallback(() => {
    setPlacementStyle(getPlacementStyle())
  }, [getPlacementStyle])

  useEffect(() => {
    const unsub = engine?.getShell().subscribeTo(CanvasScrollEvent.Name, handleScroll)
    return () => {
      unsub?.()
    }
  }, [engine, handleScroll])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    actionRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref])

  const handleAdd = useCallback(() => {
    if (doc && node) {
      doc.addNewNodes(
        {
          componentName: "DropdownMenuItem",
          props: {
            title: "New Item"
          }
        },
        node.id,
        NodeRelativePosition.InBottom,
      )
      doc.backup(HistoryableActionType.Add)
    }
  }, [doc, node])

  return (
    <>
      {visible &&
        <div
          className='rx-dropdown-popup'
          style={{
            ...placementStyle,
            backgroundColor: token.colorBgContainer,
          }}
          {...!visible ? {} : { [RXID_ATTR_NAME]: rxId }}
        >
          <div className="rx-dropdown-menu-designer" ref={ref} {...other}>
            {children}
            <div style={{ padding: 8, boxSizing: "border-box" }}>
              <Button block type="dashed" size="small" icon={<PlusOutlined />} onClick={handleAdd}>
                {t('add')}
              </Button>
            </div>
          </div>
          <CloseButton
            onClick={handleClose}
          />
        </div>
      }
      <div
        ref={handleRefChange}
        style={{
          position: 'relative',
          display: 'inline-block',
          ...style
        }}
        {...other}
        {...visible ? {} : { [RXID_ATTR_NAME]: rxId }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {actionComponent}
        {
          (hover || currentNode?.id === node?.id) && !visible && <PopupButton onClick={handleShow} />
        }
      </div>
    </>
  )
}))
