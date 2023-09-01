import { ButtonProps } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { CanvasFloatButton } from "../common"

const ButtonContainer = styled.div`
    background-color: ${props => props.theme.token?.colorBorderSecondary};
    border-radius: 4px;
`

export const CanvasButton = memo((props: ButtonProps) => {
  return (
    <ButtonContainer>
      <CanvasFloatButton {...props} />
    </ButtonContainer>
  )
})