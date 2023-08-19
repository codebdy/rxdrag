import { memo } from "react"
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
export const ResizeHandlers = memo(() => {
  return (
    <>
      <LeftHandler />
      <LeftTopHandler />
      <TopHandler />
      <RightTopHandler />
      <RightHandler />
      <RightBottomHandler />
      <BottomHandler />
      <LeftBottomHandler />
    </>
  )
})