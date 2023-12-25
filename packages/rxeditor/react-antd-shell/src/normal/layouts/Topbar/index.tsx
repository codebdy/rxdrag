import React, { CSSProperties, memo } from "react"
import styled from "styled-components";

const StyledBox= styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: ${props=>props.theme?.token?.colorBorder} solid 1px;
`

export const Topbar = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, children, ...other } = props;

  return (
    <StyledBox className = {className} {...other}>
      {children}
    </StyledBox>
  )
})