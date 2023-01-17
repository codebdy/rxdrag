import { memo } from "react";
import styled from "styled-components";

const StyledToolbox = styled.div`
width: 80px;
border-right: ${props => props.theme.token?.colorBorder} solid 1px;
padding: 8px;
`
export const Toolbox = memo(() => {
  return (
    <StyledToolbox></StyledToolbox>
  )
})