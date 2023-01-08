import { Modal } from "antd";
import React, { useRef } from "react";
import { CSSProperties, forwardRef, memo, useCallback, useState } from "react"

export type DialogProps = {
  title?: React.ReactElement,
  style?: CSSProperties,
  centered?: boolean,
  closable?: boolean,
  destroyOnClose?: boolean,
  //关闭后聚焦触发元素
  focusTriggerAfterClose?: boolean,
  content?: React.ReactElement,
  footer?: React.ReactElement,
  //是否支持键盘 esc 关闭
  keyboard?: boolean,
  //是否展示遮罩
  mask?: boolean,
  //点击蒙层是否允许关闭
  maskClosable?: boolean,
  changeRemind?: boolean,
  width?: number | string,
  actionComponent?: React.ReactElement,
}

export const Dialog = memo(forwardRef<HTMLDivElement>((props: DialogProps, ref) => {
  const {
    title,
    actionComponent,
    content,
    footer,
    style,
    ...other
  } = props;
  const [open, setOpen] = useState(false);
  const realRef = useRef<HTMLElement | null>(null);
  
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const hancleClose = useCallback(() => {
    setOpen(false)
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
      <Modal
        title={title}
        open={open}
        footer={footer}
        onCancel={hancleClose}
        getContainer={realRef.current ? () => realRef.current as any : undefined}
      >
        {content}
      </Modal>
    </div>
  )
}))