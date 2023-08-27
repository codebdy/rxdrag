import React, { CSSProperties, memo } from "react"
import { useStyles } from "../../hooks/useStyles";
import cls from "classnames"
import styled from "styled-components";

const Container = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 40px;
`

export const CanvasToolbar = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, style, children, ...other } = props;
  const styles = useStyles((token) => ({
    borderBottom: `${token.colorBorder} solid 1px`,
  }))

  return (
    <Container className={cls("rx-canvas-toolbar", className)} style={{ ...styles, ...style }} {...other}>
      {children}
    </Container>
  )
})