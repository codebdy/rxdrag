import { memo, useCallback, useState } from "react"
import styled from "styled-components"

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

export interface ResizeOffset {
  x: number,
  y: number,
  width: number,
  height: number,
}

export const ResizeHandlers = memo((
  props: {
    onResize: (layout: ResizeOffset) => void
  }
) => {
  const { onResize } = props;
  const [dragType, setDragType] = useState<DragType>();

  const handleLeftMouseDown = useCallback((e: React.MouseEvent, drgType: DragType) => {
    e.stopPropagation()
    setDragType(drgType)
  }, [])


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