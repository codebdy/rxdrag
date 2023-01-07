import React, { CSSProperties, forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import './styles.less'
import { IIcon } from 'react-shells/ant5/components/IconView/model'
import { useToken } from 'antd/es/theme/internal'
import { RXID_ATTR_NAME } from 'core'
import { useNode } from 'core-react/hooks/useNode'
import { Button } from 'antd'
import { CloseButton } from '../../CloseButton'
import styled from 'styled-components'
import { PopupButton } from '../../PopupButton'
import { useDocument } from 'core-react/hooks/useDocument'
import { useDesignerEngine } from 'core-react/hooks'
import { useCurrentNode } from 'core-react/hooks/useCurrentNode'

const ActionShell = styled.div`
  position: relative;
  display: inline-block;
`

export interface IDropdownMenuProps {
  title?: string,
  icon?: IIcon,
  style?: CSSProperties,
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
  children?: React.ReactNode,
  actionComponent?: React.ReactElement,
  menu?: React.ReactElement,
}


export const DropdownDesigner = memo(forwardRef<HTMLDivElement>((props: IDropdownMenuProps, ref) => {
  const { title, icon, placement = 'bottomLeft', children, actionComponent, menu, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const actionRef = useRef<HTMLDivElement>(null);
  const [placementStyle, setPlacementStyle] = useState<any>()
  const [hover, setHover] = useState(false);
  const [, token] = useToken()
  const engine = useDesignerEngine()
  const doc = useDocument()
  const node = useNode()
  const currentNode = useCurrentNode();

  const handleClose = useCallback(() => {
    setVisiable(false);
    if (doc && node) {
      engine?.getActions().selectNodes([node.id], doc.id)
    }
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
    if (doc) {
      engine?.getActions().selectNodes([node?.slots?.['menu'] || ""], doc.id)
    }
  }, [doc, engine, getPlacementStyle, node?.slots])

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <>
      {visible &&
        <div
          className='menu-designer'
          style={{
            ...placementStyle,
            backgroundColor: token.colorBgContainer,
          }}>
          {menu}
          <CloseButton
            onClick={handleClose}
          />
        </div>
      }
      <ActionShell
        ref={actionRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button  {...other} >
          {
            children
          }
        </Button>
        {
          (hover || currentNode?.id === node?.id) && !visible && <PopupButton onClick={handleShow} />
        }
      </ActionShell>
    </>
  )
}))
