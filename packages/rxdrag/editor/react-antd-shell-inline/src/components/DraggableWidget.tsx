import { CSSProperties, memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IPosition, ISize, IWidgetLayout } from "../interfaces";
import { useWidgetLayout } from "../hooks/useWidgetLayout";
import { useSetWidgetLayout } from "../hooks/useSetWidgetLayout";

const Widget = styled.div`
  position: fixed;
`
export const DraggableWidget = memo((
  props: {
    //用于保存位置信息的key，如果不赋值，则不保存
    name?: string,
    children?: React.ReactNode,
    defaultPosition: IPosition,
    defaultSize?: ISize,
    style?: CSSProperties,
    className?: string,
  }
) => {
  const { name, defaultPosition, defaultSize, children, style, className, ...rest } = props;
  const [layout, setLayout] = useState<IWidgetLayout>({ ...defaultPosition, ...defaultSize })
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const [startLayout, setStartLayout] = useState<IWidgetLayout>()

  const globalLayout = useWidgetLayout(name)
  const setGlobalLayout = useSetWidgetLayout(name)

  useEffect(() => {
    setLayout({ ...defaultPosition, ...defaultSize })
  }, [defaultPosition, defaultSize])

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
    setStartLayout({ ...layout })
  }, [layout])

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
      className={"rx-draggable-widget " + (className || "")}
      style={{
        ...style,
        left: layout?.x,
        top: layout?.y,
        width: layout?.width,
        height: layout?.heiht,
      }}
      {...rest}
      onMouseDown={handleMouseDown}
    >
      {children}
    </Widget>
  )
})