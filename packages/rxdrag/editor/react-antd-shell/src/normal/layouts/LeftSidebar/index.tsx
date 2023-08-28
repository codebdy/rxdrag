import React, { memo } from "react"
import styled from "styled-components";

const Container = styled.div`
  width: 50px;
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow: auto;
  border-right: ${props => props.theme?.token?.colorBorder};
`


export const LeftSidebar = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children, ...other } = props;
  return (
    <Container className="rx-left-sidebar"  {...other}>
      {children}
    </Container>
  )
})