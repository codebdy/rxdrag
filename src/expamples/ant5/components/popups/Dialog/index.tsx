import { Modal } from "antd";
import React, { useEffect, useRef } from "react";
import { CSSProperties, forwardRef, memo, useCallback, useState } from "react"

export type DialogProps = {
  open?: boolean,
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
    open,
    title,
    actionComponent,
    content,
    footer,
    style,
    ...other
  } = props;
  const [visiable, setVisiable] = useState<boolean>();
  const realRef = useRef<HTMLElement | null>(null);

  useEffect(()=>{
    setVisiable(open)
  }, [open])

  const handleOpen = useCallback(() => {
    setVisiable(true)
  }, [])

  const handleClose = useCallback(() => {
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
      <Modal
        title={title}
        open={visiable}
        footer={footer}
        onCancel={handleClose}
        getContainer={realRef.current ? () => realRef.current as any : undefined}
      >
        {content}
      </Modal>
    </div>
  )
}))