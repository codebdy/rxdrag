import styled from "styled-components";

export const TreeListTreeView = styled(DirectoryTree)`
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
      background-color: #d8d1bf;
      color: #a21f2d;
    }
    &::before{
      display: none;
    }
  }
  .ant-tree-node-selected{
    color: #a21f2d !important;
  }
  .ant-tree-treenode-selected{
    background-color: #d8d1bf;
    color: #a21f2d;
    .ant-tree-switcher{
      color: #a21f2d !important;
    }
    &:hover{
      background-color: #d8d1bf;
    }
    &::before{
      display: none;
    }
  }
`;
