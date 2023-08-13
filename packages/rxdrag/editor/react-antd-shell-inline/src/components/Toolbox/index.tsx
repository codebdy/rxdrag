import { memo } from "react"
import styled from "styled-components"
import { boxShadow } from "../utils"

const Container = styled.div`
  position: fixed;
  height:calc(100vh - 120px);
  width: 200px;
  box-shadow: ${boxShadow};
  top: 50%;
  transform: translateY(-50%);
  left:8px;
  border: solid 1px ${props => props.theme?.token?.colorBorder};
  background-color: ${props => props.theme?.token?.colorBgContainer};
  border-radius: 8px;
  display: flex;
`

export const Toolbox = memo(() => {
  return (
    <Container>
      工具箱
    </Container>
  )
})