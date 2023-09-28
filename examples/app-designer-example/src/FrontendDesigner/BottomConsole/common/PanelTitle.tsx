import styled from "styled-components";

export const PanelTitle = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  color: ${props => props.theme?.token?.colorTextSecondary};
  align-items: center;
  padding: 0 16px;
  padding-right: 8px;
`
