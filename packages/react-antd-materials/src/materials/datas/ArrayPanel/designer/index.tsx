import { ArrayPanelProps } from "@rxdrag/react-antd-components";
import { forwardRef, memo } from "react"
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const ArrayPanelDesigner = memo(forwardRef<HTMLDivElement, ArrayPanelProps>((props, ref) => {
  const { children } = props;

  return (
    <Container ref={ref}>
      {
        children
      }
    </Container>
  )
}))