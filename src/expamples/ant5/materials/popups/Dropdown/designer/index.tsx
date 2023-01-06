import React, { CSSProperties, forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import './styles.less'
import { IIcon } from 'react-shells/ant5/components/IconView/model'
import { useToken } from 'antd/es/theme/internal'
import { RXID_ATTR_NAME } from 'core'
import { useNode } from 'core-react/hooks/useNode'


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
  const { title, icon, placement = 'bottomLeft', children, actionComponent, menu, style, ...other } = props;
  const [visible, setVisiable] = useState(true);
  const actionRef = useRef<HTMLDivElement>(null);
  const [placementStyle, setPlacementStyle] = useState<any>()
  const [, token] = useToken()

  const handleShow = useCallback(() => {

    //if (canShow) {
    setVisiable(true);
    //}
  }, [])

  const handleClose = useCallback(() => {
    setVisiable(false);
  }, [])

  const node = useNode()

  const getPlacementStyle = useCallback(() => {
    const actionRxId = node?.slots?.['actionComponent']
    const doc = actionRef?.current?.ownerDocument
    const actionDom = doc?.querySelector(`[${RXID_ATTR_NAME}="${actionRxId}"]`)
    const rect = actionDom?.getBoundingClientRect();

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
  }, [node, placement])

  useEffect(() => {
    setTimeout(() => {
      setPlacementStyle(getPlacementStyle())
    }, 40)

  }, [getPlacementStyle])


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
        </div>
      }
      <div ref={actionRef} style={{ display: "inline", ...style }} {...other} >
        {
          actionComponent
        }
      </div>
    </>
  )
}))
