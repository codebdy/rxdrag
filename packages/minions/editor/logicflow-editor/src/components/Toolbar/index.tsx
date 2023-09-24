import styled from "styled-components"

export const Toolbar = styled.div`
  display: flex;
  padding: 0 16px;
  height: 40px;
  align-items: center;
  border-bottom: ${props => props.theme.token?.colorBorderSecondary} solid 1px;
`
