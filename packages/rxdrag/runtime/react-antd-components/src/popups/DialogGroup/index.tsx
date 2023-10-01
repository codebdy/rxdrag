import { useController } from "@rxdrag/react-runner";
import { Modal } from "antd";
import React, { useRef } from "react";
import { CSSProperties, forwardRef, memo, useCallback } from "react"

/**
 * 本组件强依赖控制器
 *  */
export type DialogGroupProps = {
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

export const DialogGroup = memo(forwardRef<HTMLDivElement>((props: DialogGroupProps, ref) => {
  const {
    open,
    title,
    actionComponent,
    content,
    footer,
    style,
    ...other
  } = props;
  const realRef = useRef<HTMLElement | null>(null);
  //获取组件控制器
  const controller = useController();

  const handleOpen = useCallback(() => {
    controller?.setProp("open", true)
  }, [controller])

  const handleClose = useCallback(() => {
    controller?.setProp("open", false)
  }, [controller])

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
        onCancel={handleClose}
        getContainer={realRef.current ? () => realRef.current as HTMLElement : undefined}
      >
        {content}
      </Modal>
    </div>
  )
}))