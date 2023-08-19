import { memo } from "react"
import styled from "styled-components"

const width = 6;

const Handler = styled.div`
  position: absolute;
  background-color: #fff;
  border:solid 1px red;
  z-index: 1;
`

const HorizontalHandler = styled(Handler)`
  width: calc(100% - ${width * 2}px);
  //左侧
  left: ${width}px;
  height: ${width}px;
`

const VerticalHandler = styled(Handler)`
  height: calc(100% - ${width * 2}px);
  width: ${width}px;
  //顶
  top: ${width}px;
`

const RightHandler = styled(VerticalHandler)`
  //偏移
  right:${-(width / 2)}px;
`

const LeftHandler = styled(VerticalHandler)`
  //偏移
  left:${-(width / 2)}px;
`

const TopHandler = styled(HorizontalHandler)`
  //偏移
  top: ${-(width / 2)}px;  
`
const BottomHandler = styled(HorizontalHandler)`
  //偏移
  bottom: ${-(width / 2)}px;  
`
export const ResizeHandlers = memo(() => {
  return (
    <>
      <LeftHandler />
      <TopHandler />
      <RightHandler />
      <BottomHandler />
    </>
  )
})