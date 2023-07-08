import React from "react"
import { memo } from "react"
import styled from "styled-components"

const StyledToolbar = styled.div`
  display: flex;
  padding: 0 16px;
  height: 40px;
  align-items: center;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
`

export const Toolbar = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;

  return (
    <StyledToolbar className="logicflow-editor-toobar">
      {children}
    </StyledToolbar>
  )
})