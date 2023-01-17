import { forwardRef, memo } from "react"
import styled, { CSSProperties } from "styled-components"

const StyledPaper = styled.div`
  border-radius: 5px;
  padding: 16px;
  background-color: ${props => props.theme.token?.colorBgContainer};
`

export type PaperProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

export const Paper = memo(forwardRef<HTMLDivElement, PaperProps>((
  props, ref) => {
  const { children, ...other } = props
  return (
    <StyledPaper ref={ref} {...other}>
      {children}
    </StyledPaper>
  )
}))