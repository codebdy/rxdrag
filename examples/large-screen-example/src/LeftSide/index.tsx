import { memo } from "react"
import styled from "styled-components"
import { ScreenDialog } from "./ScreenDialog"
import { floatShadow } from "@rxdrag/react-antd-shell"

const Container = styled.div`
  width: 48px;
  padding-bottom: 8px;
  padding-top: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 0;
  background-color: ${props => props.theme.token?.colorBgBase};
  color: ${props => props.theme.token?.colorText};
  box-shadow: ${floatShadow};
  height: 100%;
  box-sizing: border-box;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  z-index: 1;
`

export const LeftSide = memo(() => {
  return (
    <Container className="rx-left-side">
      <ScreenDialog />
    </Container>
  )
})