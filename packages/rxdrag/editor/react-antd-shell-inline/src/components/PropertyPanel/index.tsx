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
  right:8px;
  border: solid 1px ${props => props.theme?.token?.colorBorder};
  background-color: ${props => props.theme?.token?.colorBgContainer};
  color: ${props => props.theme?.token?.colorText};
  border-radius: 4px;
  display: flex;
`

export const PropertyPanel = memo(() => {
  return (
    <Container>
      属性面板
    </Container>
  )
})