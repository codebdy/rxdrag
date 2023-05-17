import { memo, ReactNode } from "react";
import styled from "styled-components";

const StyledToolbox = styled.div`
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  display: flex;
  flex-flow: column;
`


export const Toolbox = memo((props: {
  children?: ReactNode
}) => {
  const { children } = props

  return (
    <StyledToolbox>
      {children}
    </StyledToolbox >
  )
})