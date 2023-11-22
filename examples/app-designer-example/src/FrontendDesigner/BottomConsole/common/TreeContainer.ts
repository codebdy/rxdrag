import styled from "styled-components";

export const TreeContainer = styled.div`
  flex:1;
  margin-top: 8px;
  height: 0;
  overflow: auto;
  &.hidden{
    display: none;
  }
  .ant-tree{
    background-color: transparent;
    .ant-tree-list{
      background-color: transparent;
    }
    .ant-tree-node-content-wrapper{
      display: flex;
      .ant-tree-title{
        flex:1;
      }
    }
  }
`