import { memo } from "react"
import styled from "styled-components"
import { boxShadow, defaultVerticalMargin } from "../utils"
import { DraggableWidget } from "../DraggableWidget"

const Container = styled(DraggableWidget)`
  position: fixed;
  height:40px;
  min-width: 60px;
  box-shadow: ${boxShadow};
  bottom: ${defaultVerticalMargin}px;
  left: 50%;
  transform: translateX(-50%);
  border: solid 1px ${props => props.theme?.token?.colorBorder};
  background-color: ${props => props.theme?.token?.colorBgContainer};
  border-radius: 8px;
  display: flex;
  align-items: center;
`

export const Toolbar = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props

  return (
    <Container className="rx-toolbar">
      {children}
    </Container>
  )
})