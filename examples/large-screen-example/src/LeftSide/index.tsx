import { memo } from "react"
import styled from "styled-components"
import { ScreenDialog } from "./ScreenDialog"
import { floatShadow } from "@rxdrag/react-antd-shell"

const Container = styled.div`
  width: 40px;
  max-height: calc(100% - 100px);
  position: fixed;
  top: 56px;
  left: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  color: ${props => props.theme.token?.colorText};
  box-shadow: ${floatShadow};
  padding: 0px;
  box-sizing: border-box;
`

const ButtonMask = styled.div`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  width: 100%;
`
export const LeftSide = memo(() => {
  return (
    <Container className="rx-left-side">
      <ButtonMask>
        <ScreenDialog />
      </ButtonMask>
    </Container>
  )
})