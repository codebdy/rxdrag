import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import styled from "styled-components";

const Container = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: ${props=>props.theme?.token?.colorBorder} solid 1px;
`

export const CanvasToolbar = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, children, ...other } = props;
  return (
    <Container className={cls("rx-canvas-toolbar", className)} {...other}>
      {children}
    </Container>
  )
})