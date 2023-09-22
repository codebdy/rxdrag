import { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ResizeHandlers } from "./ResizeHandlers";
import classnames from "classnames";
import { MouseMoveEvent, MouseUpEvent, RXID_ATTR_NAME } from "@rxdrag/core";
import { IPosition, IWidgetLayout } from "./interfaces";
import { useDesignerEngine } from "@rxdrag/react-core";
import { getRecentRxElement } from "@rxdrag/shared";

const Widget = styled.div`
  position: fixed;
  user-select: none;
`
export const DraggableWidget = memo((
  props: {
    //用于保存位置信息的key，如果不赋值，则不保存
    //name?: string,
    children?: React.ReactNode,
    style?: CSSProperties,
    className?: string,
    maxWidth?: number,
    maxHeight?: number,
    minWidth?: number,
    minHeight?: number,
    closed?: boolean,
  }
) => {
  const { children, style, className, maxWidth, maxHeight, minWidth, minHeight, closed, ...rest } = props;
  const [layout, setLayout] = useState<IWidgetLayout>()
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const [startLayout, setStartLayout] = useState<IWidgetLayout>()
  const ref = useRef<HTMLDivElement>(null)
  const engine = useDesignerEngine()

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLDivElement).id !== ref.current?.id) {
      return
    }

    if (getRecentRxElement(e.target as HTMLElement, RXID_ATTR_NAME)) {
      return
    }

    setMousePressedPoint({
      x: e.screenX,
      y: e.screenY
    })
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setStartLayout({ ...layout, x: rect.left, y: rect.top, width: rect.width, heiht: rect.height })
    }

  }, [layout])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.screenX < 0 || e.screenY < 0 || !mousePressedPoint || !startLayout) {
      return
    }
    if (e.screenY > document.body.clientHeight || e.screenX > document.body.clientWidth) {
      return
    }
    const diff = {
      offsetX: e.screenX - (mousePressedPoint.x || 0),
      offsetY: e.screenY - (mousePressedPoint.y || 0),
    }
    if (startLayout) {
      const newLayout = { ...layout, x: (startLayout?.x || 0) + diff.offsetX, y: (startLayout.y || 0) + diff.offsetY }
      setLayout(newLayout)
    }
  }, [layout, mousePressedPoint, startLayout])

  const handleMouseUp = useCallback(() => {
    setMousePressedPoint(undefined);
    setStartLayout(undefined);
  }, [])

  const handleShellMouseMove = useCallback(
    (e: MouseMoveEvent) => {
      handleMouseMove(e.originalEvent)
    },
    [handleMouseMove]
  );


  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    const unsubMouseMove = engine?.getShell().subscribeTo(MouseMoveEvent.Name, handleShellMouseMove)
    const unsubMouseUp = engine?.getShell().subscribeTo(MouseUpEvent.Name, handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      unsubMouseMove?.()
      unsubMouseUp?.()
    }
  }, [engine, handleMouseMove, handleMouseUp, handleShellMouseMove])

  const handleResize = useCallback((lyout: IWidgetLayout) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    setLayout({
      ...layout,
      ...lyout,
    })
  }, [layout])

  return (
    <Widget
      ref={ref}
      className={classnames("rx-draggable-widget", className)}
      style={{
        ...style,
        left: layout?.x,
        top: layout?.y,
        width: layout?.width,
        height: layout?.heiht,
        transform: (layout?.x || layout?.y) ? "none" : undefined,
        display: closed ? "none" : style?.display,
      }}
      {...rest}
      onMouseDown={handleMouseDown}
    >
      {children}
      <ResizeHandlers
        widget={ref.current}
        layout={layout}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        minWidth={minWidth}
        minHeight={minHeight}
        onResize={handleResize}
      />
    </Widget>
  )
})