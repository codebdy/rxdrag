import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { IPosition, IWidgetLayout } from "../../interfaces";

const thickness = 6;

const offset = -(thickness / 2);

const Handler = styled.div`
  position: absolute;
  z-index: 1;
`
const HorizontalHandler = styled(Handler)`
  width: calc(100% - ${thickness * 2}px);
  //左侧
  left: ${thickness}px;
  height: ${thickness}px;
  cursor: s-resize;
`
const VerticalHandler = styled(Handler)`
  height: calc(100% - ${thickness * 2}px);
  width: ${thickness}px;
  //顶
  top: ${thickness}px;
  cursor: e-resize;
`
const CornerHandler = styled(Handler)`
  width: ${thickness * 2}px;
  height: ${thickness * 2}px;
  z-index: 2;
`
const LeftTopHandler = styled(CornerHandler)`
  left: ${offset}px;
  top: ${offset}px;
  cursor: nw-resize;
`
const RightTopHandler = styled(CornerHandler)`
  right: ${offset}px;
  top: ${offset}px;
  cursor: ne-resize;
`
const RightBottomHandler = styled(CornerHandler)`
  bottom: ${offset}px;
  right: ${offset}px;
  cursor: nw-resize;
`
const LeftBottomHandler = styled(CornerHandler)`
  left: ${offset}px;
  bottom: ${offset}px;
  cursor: ne-resize;
`
const RightHandler = styled(VerticalHandler)`
  //偏移
  right:${offset}px;
`
const LeftHandler = styled(VerticalHandler)`
  //偏移
  left:${offset}px;
`
const TopHandler = styled(HorizontalHandler)`
  //偏移
  top: ${offset}px;  
`
const BottomHandler = styled(HorizontalHandler)`
  //偏移
  bottom: ${offset}px;  
`

enum DragType {
  Left = "left",
  LeftTop = "leftTop",
  Top = "top",
  RightTop = "rightTop",
  Right = "right",
  RightBottom = "rightBottom",
  Bottom = "bottom",
  LeftBottom = "leftBottom"
}

export const ResizeHandlers = memo((
  props: {
    layout: IWidgetLayout,
    onResize: (offset: IWidgetLayout) => void,
    widget: HTMLDivElement | null,
    maxWidth?: number,
    maxHeight?: number,
    minWidth?: number,
    minHeight?: number,
  }
) => {
  const { layout, onResize, widget, maxWidth, maxHeight, minWidth, minHeight, } = props;
  const [dragType, setDragType] = useState<DragType>();
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const [startLayout, setStartLayout] = useState<IWidgetLayout>()

  const handleLeftMouseDown = useCallback((e: React.MouseEvent, drgType: DragType) => {
    e.stopPropagation()
    setDragType(drgType)
    setMousePressedPoint({
      x: e.clientX,
      y: e.clientY
    })
    const rect = widget?.getBoundingClientRect()
    if (rect) {
      setStartLayout({ ...layout, x: rect.left, y: rect.top, width: rect.width, heiht: rect.height })
    }
  }, [layout, widget])

  const handleMouseUp = useCallback(() => {
    setMousePressedPoint(undefined);
    setDragType(undefined);

  }, [])

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

    const newLayout = { ...startLayout }
    switch (dragType) {
      case DragType.Left:
        newLayout.x = (startLayout.x || 0) + diff.offsetX;
        newLayout.width = (startLayout.width || 0) - (diff.offsetX);
        break;
      case DragType.Right:
        newLayout.width = (startLayout.width || 0) + (diff.offsetX);
        break;
      case DragType.Top:
        newLayout.y = (startLayout.y || 0) + diff.offsetY;
        newLayout.heiht = (startLayout.heiht || 0) - (diff.offsetY);
        break;
      case DragType.Bottom:
        newLayout.heiht = (startLayout.heiht || 0) + (diff.offsetY);
        break;
      case DragType.LeftTop:
        newLayout.x = (startLayout.x || 0) + diff.offsetX;
        newLayout.width = (startLayout.width || 0) - (diff.offsetX);
        newLayout.y = (startLayout.y || 0) + diff.offsetY;
        newLayout.heiht = (startLayout.heiht || 0) - (diff.offsetY);
        break;
      case DragType.RightTop:
        newLayout.width = (startLayout.width || 0) + (diff.offsetX);
        newLayout.y = (startLayout.y || 0) + diff.offsetY;
        newLayout.heiht = (startLayout.heiht || 0) - (diff.offsetY);
        break;
      case DragType.RightBottom:
        newLayout.width = (startLayout.width || 0) + (diff.offsetX);
        newLayout.heiht = (startLayout.heiht || 0) + (diff.offsetY);
        break;
      case DragType.LeftBottom:
        newLayout.x = (startLayout.x || 0) + diff.offsetX;
        newLayout.width = (startLayout.width || 0) - (diff.offsetX);
        newLayout.heiht = (startLayout.heiht || 0) + (diff.offsetY);
        break;
    }

    if (maxWidth && (newLayout.width || 0) > maxWidth) {
      newLayout.width = maxWidth
    }

    if (maxHeight && (newLayout.heiht || 0) > maxHeight) {
      newLayout.heiht = maxHeight
    }

    if (minWidth && (newLayout.width || 0) < minWidth) {
      newLayout.width = minWidth
    }

    if (minHeight && (newLayout.heiht || 0) < minHeight) {
      newLayout.heiht = minHeight
    }

    onResize?.(newLayout)

  }, [dragType, maxHeight, maxWidth, minHeight, minWidth, mousePressedPoint, onResize, startLayout])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [handleMouseMove, handleMouseUp])


  return (
    <>
      <LeftHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.Left)}
      />
      <LeftTopHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.LeftTop)}
      />
      <TopHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.Top)}
      />
      <RightTopHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.RightTop)}
      />
      <RightHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.Right)}
      />
      <RightBottomHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.RightBottom)}
      />
      <BottomHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.Bottom)}
      />
      <LeftBottomHandler
        onMouseDown={e => handleLeftMouseDown(e, DragType.LeftBottom)}
      />
    </>
  )
})