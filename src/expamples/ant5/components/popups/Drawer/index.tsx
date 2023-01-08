import { Drawer as AntdDrawer } from "antd";
import React from "react";
import { CSSProperties, forwardRef, memo, useCallback, useState } from "react"

export type DrawerProps = {
  autoFocus?: boolean,
  afterOpenChange?: boolean,
  bodyStyle?: CSSProperties,
  closable?: boolean,
  contentWrapperStyle?: CSSProperties,
  destroyOnClose?: boolean,
  extra?: React.ReactElement,
  footer?: React.ReactElement,
  footerStyle?: CSSProperties,
  forceRender?: boolean,
  headerStyle?: CSSProperties,
  height?: number | string,
  //是否支持键盘 esc 关闭
  keyboard?: boolean,
  //是否展示遮罩
  mask?: boolean,
  //点击蒙层是否允许关闭
  maskClosable?: boolean,
  maskStyle?: CSSProperties,
  placement?: 'top' | 'right' | 'bottom' | 'left', //defualt right
  rootStyle?: CSSProperties,
  size?: 'default' | 'large',
  title?: React.ReactElement,
  style?: CSSProperties,
  content?: React.ReactElement,
  width?: number | string,
  actionComponent?: React.ReactElement,
}

export const Drawer = memo(forwardRef<HTMLDivElement>((props: DrawerProps, ref) => {
  const {
    title,
    actionComponent,
    content,
    footer,
    extra,
    style,
    ...other
  } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const hancleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div ref={ref} style={{ display: "inline-block", position: "relative", ...style }}  {...other}>
      {actionComponent && React.cloneElement(actionComponent, { onClick: handleOpen })}
      <AntdDrawer
        title={title}
        open={open}
        footer={footer}
        extra={extra}
        onClose={hancleClose}
      >
        {content}
      </AntdDrawer>
    </div>
  )
}))