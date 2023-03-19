import React, { CSSProperties, memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  flex: 1;
  height: 0;
  display: flex;
  flex-flow: column;
`

export type BoxProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

export const PaneContainer = memo((
  props: BoxProps,
) => {
  const { children, ...other } = props;

  return <Container {...other}>
    {children}
  </Container>
})