import { memo } from "react"
import styled from "styled-components"
import { floatShadow } from "../utils"

const Container = styled.div`
  width: 56px;
  max-height: calc(100% - 100px);
  position: fixed;
  top: 64px;
  left: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  color: ${props => props.theme.token?.colorText};
  box-shadow: ${floatShadow};
`
export const LeftSide = memo(() => {
  return (
    <Container>
      页面 <br />
      菜单 <br />
    </Container>
  )
})