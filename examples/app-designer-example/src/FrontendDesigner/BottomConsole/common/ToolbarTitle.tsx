import styled from "styled-components";

export const ToolbarTitle = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  color: ${props => props.theme?.token?.colorTextSecondary};
  .text{
    margin-left: 4px;
  }
`;
