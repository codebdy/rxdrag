import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  height: 100%;
  background: ${props => props.theme?.token.colorBorderSecondary};
`

export const CenterContent = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, children, ...other } = props;

  return (
    <Container className={cls(className, "rx-center-content")} {...other}>
      {children}
    </Container>
  )
})