import { Drawer as AntdDrawer } from "antd";
import React, { useEffect, useRef } from "react";
import { CSSProperties, forwardRef, memo, useCallback, useState } from "react"

export type DrawerGroupProps = {
  open?: boolean,
  autoFocus?: boolean,
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

export const DrawerGroup = memo(forwardRef<HTMLDivElement>((props: DrawerGroupProps, ref) => {
  const {
    open,
    title,
    actionComponent,
    content,
    footer,
    extra,
    style,
    ...other
  } = props;
  const [visiable, setVisiable] = useState<boolean>();
  const realRef = useRef<HTMLElement | null>(null);
  const handleOpen = useCallback(() => {
    setVisiable(true)
  }, [])

  useEffect(() => {
    setVisiable(open)
  }, [open])

  const hancleClose = useCallback(() => {
    setVisiable(false)
  }, [])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    realRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref])

  return (
    <div ref={handleRefChange} style={{ display: "inline-block", position: "relative", ...style }}  {...other}>
      {actionComponent && React.cloneElement(actionComponent, { onClick: handleOpen })}
      <AntdDrawer
        title={title}
        open={visiable}
        footer={footer}
        extra={extra}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getContainer={realRef.current ? () => realRef.current as any : undefined}
        onClose={hancleClose}
      >
        {content}
      </AntdDrawer>
    </div>
  )
}))