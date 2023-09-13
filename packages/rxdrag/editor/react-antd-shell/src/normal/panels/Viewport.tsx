import { ForwardedRef, forwardRef, memo } from "react"
import styled from "styled-components"

const ViewPortRoot = styled.div`
  flex: 1;
  padding: 0px 16px;
  height: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  align-items: center;
`
export interface ViewportProps {
  children?: React.ReactNode
}

export const Viewport = memo(forwardRef((props: ViewportProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ViewPortRoot ref={ref} {...props} />
  )
}))