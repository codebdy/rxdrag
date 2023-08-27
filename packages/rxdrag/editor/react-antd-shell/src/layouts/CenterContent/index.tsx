import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import { useStyles } from "../../hooks"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  height: 100%;
`

export const CenterContent = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, children, style, ...other } = props;
  const styles = useStyles((token) => ({
    background: token.colorBorderSecondary
  }))

  return (
    <Container className={cls(className, "rx-center-content")} style={{ ...styles, ...style }} {...other}>
      {children}
    </Container>
  )
})