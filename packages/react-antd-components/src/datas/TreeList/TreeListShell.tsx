import styled from "styled-components";

export const TreeListShell = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  .bordered{
    border: solid 1px ${props => props.theme?.token?.colorBorder}
  }

  .ant-tree-treenode{
    padding: 0;
    border-radius: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 2px 0;
    padding: 0 0 0 8px;
    .anticon-file{
      display: none;
    }
    .ant-tree-switcher{
      display: flex;
      align-items: center;
      width: 12px;
    }
    .ant-tree-node-content-wrapper{
      flex:1;
      display: flex;
      align-items: center;
      background-color: transparent;
      .ant-tree-title{
        flex:1;
        background-color: transparent;
      }
    }
    &:hover{
      //background-color: #d8d1bf;
      color: ${props => props.theme.token?.colorPrimary};
    }
    &::before{
      display: none;
    }
  }
  .ant-tree-node-selected{
    color: ${props => props.theme.token?.colorPrimary} !important;
  }
  .ant-tree-treenode-selected{
    background-color: ${props => props.theme.token?.colorInfoBgHover};
    color: ${props => props.theme.token?.colorPrimary};
    .ant-tree-switcher{
      color: ${props => props.theme.token?.colorPrimary} !important;
    }
    &:hover{
      //background-color: #d8d1bf;
    }
    &::before{
      display: none;
    }
  }
`;
