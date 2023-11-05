import styled from "styled-components";

export const TreeListShell = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  .bordered{
    border: solid 1px ${props => props.theme?.token?.colorBorder}
  }

  .ant-tree-node-content-wrapper{
    display: flex;
    align-items: center;
    .ant-tree-title{
      flex:1;
      display: flex;
      align-items: center;
    }
  }
  .ant-tree-switcher{
    display: flex;
    align-items: center;
  }
`;
