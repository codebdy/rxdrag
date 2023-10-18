import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  border: solid 1px  ${props => props.theme.token?.colorBorder};
  border-left: 0;
  overflow: auto;
  .ant-tree-node-content-wrapper{
    display: flex;
    .ant-tree-title{
      flex:1;
  }
}
`

export const LogicTree= memo(()=>{
  return(
    <></>
  )
})