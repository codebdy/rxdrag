import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 56px;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-right: solid 1px ${props => props.theme.token?.colorBorder};
`
export const LeftSide = memo(()=>{
  return(
    <Container>
      页面 <br />
      菜单 <br />
      模型 <br />
      设备 <br />
    </Container>
  )
})