import { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IPosition, IWidgetLayout } from "../interfaces";
import { useWidgetLayout } from "../hooks/useWidgetLayout";
import { useSetWidgetLayout } from "../hooks/useSetWidgetLayout";

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
  }
) => {
  const { name, children, style, className, ...rest } = props;
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
    if (e.clientX < 0 || e.clientY < 0) {
      return
    }
    if (e.clientY > document.body.clientHeight || e.clientX > document.body.clientWidth) {
      return
    }
    if (mousePressedPoint) {
      const diff = {
        offsetX: e.clientX - mousePressedPoint.x,
        offsetY: e.clientY - mousePressedPoint.y,
      }
      if (startLayout) {
        const newLayout = { ...layout, x: startLayout?.x + diff.offsetX, y: startLayout.y + diff.offsetY }
        setLayout(newLayout)
      }
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

  return (
    <Widget
      ref={ref}
      className={"rx-draggable-widget " + (className || "")}
      style={{
        ...style,
        left: layout?.x,
        top: layout?.y,
        width: layout?.width,
        height: layout?.heiht,
        transform: layout ? "none" : undefined,
      }}
      {...rest}
      onMouseDown={handleMouseDown}
    >
      {children}
    </Widget>
  )
})