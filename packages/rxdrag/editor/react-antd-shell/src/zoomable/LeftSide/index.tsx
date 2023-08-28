import { memo } from "react"
import styled from "styled-components"

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
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.05);
`
export const LeftSide = memo(() => {
  return (
    <Container>
      页面 <br />
      菜单 <br />
    </Container>
  )
})