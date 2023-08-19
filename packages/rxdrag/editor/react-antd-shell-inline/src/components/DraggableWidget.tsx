import { memo } from "react";
import styled from "styled-components";

const Widget = styled.div`
  position: fixed;
`
export const DraggableWidget = memo((
  props: {
    //用于保存位置信息的key，如果不赋值，则不保存
    name?: string,
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  return (<Widget className="rx-draggable-widget">
    {children}
  </Widget>)
})