import { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IPosition, IWidgetLayout } from "../../interfaces";
import { useWidgetLayout } from "../../hooks/useWidgetLayout";
import { useSetWidgetLayout } from "../../hooks/useSetWidgetLayout";
import { ResizeHandlers } from "./ResizeHandlers";
import classnames from "classnames";
import { getRecentRxElement } from "@rxdrag/shared";
import { RXID_ATTR_NAME } from "@rxdrag/core";


const Widget = styled.div`
  position: fixed;
  user-select: none;
`
export const DraggableWidget = memo((
  props: {
    //用于保存位置信息的key，如果不赋值，则不保存
    name?: string,
    children?: React.ReactNode,
    style?: CSSProperties,
    className?: string,
    resizable?: boolean,
    maxWidth?: number,
    maxHeight?: number,
    minWidth?: number,
    minHeight?: number,
  }
) => {
  const { name, children, style, className, resizable, maxWidth, maxHeight, minWidth, minHeight, ...rest } = props;
  const [layout, setLayout] = useState<IWidgetLayout>()
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const [startLayout, setStartLayout] = useState<IWidgetLayout>()
  const ref = useRef<HTMLDivElement>(null)
  const globalLayout = useWidgetLayout(name)
  const setGlobalLayout = useSetWidgetLayout(name)

  useEffect(() => {
    if (globalLayout) {
      setLayout(globalLayout)
    }
  }, [globalLayout])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLDivElement).id !== ref.current?.id) {
      return
    }

    if (getRecentRxElement(e.target as HTMLElement, RXID_ATTR_NAME)) {
      return
    }

    setMousePressedPoint({
      x: e.clientX,
      y: e.clientY
    })
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setStartLayout({ ...layout, x: rect.left, y: rect.top, width: rect.width, heiht: rect.height })
    }

  }, [layout])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientX < 0 || e.clientY < 0 || !mousePressedPoint || !startLayout) {
      return
    }
    if (e.clientY > document.body.clientHeight || e.clientX > document.body.clientWidth) {
      return
    }
    const diff = {
      offsetX: e.clientX - (mousePressedPoint.x || 0),
      offsetY: e.clientY - (mousePressedPoint.y || 0),
    }
    if (startLayout) {
      const newLayout = { ...layout, x: (startLayout?.x || 0) + diff.offsetX, y: (startLayout.y || 0) + diff.offsetY }
      setLayout(newLayout)
    }
  }, [layout, mousePressedPoint, startLayout])

  const handleMouseUp = useCallback(() => {
    setMousePressedPoint(undefined);
    setStartLayout(undefined);
    setGlobalLayout(layout)
  }, [layout, setGlobalLayout])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [handleMouseMove, handleMouseUp])

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
        display: globalLayout?.closed ? "none" : style?.display,
      }}
      {...rest}
      onMouseDown={handleMouseDown}
    >
      {children}
      {resizable && layout &&
        <ResizeHandlers
          widget={ref.current}
          layout={layout}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          minWidth={minWidth}
          minHeight={minHeight}
          onResize={handleResize}
        />}
    </Widget>
  )
})