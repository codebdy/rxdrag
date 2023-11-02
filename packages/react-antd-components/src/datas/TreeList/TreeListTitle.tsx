import styled from "styled-components";

export const TreeListTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  padding: 0 16px;
  .anticon{
    //color:${props => props.theme.token?.colorPrimary};
  }
`;
