import React, { CSSProperties, memo } from "react"
import { useStyles } from "../../hooks/useStyles";
import styled from "styled-components";

const StyledBox= styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
`

export const Topbar = memo((
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
    <StyledBox className = {className} style={{ ...styles, ...style }} {...other}>
      {children}
    </StyledBox>
  )
})