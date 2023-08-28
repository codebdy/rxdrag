import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 32px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  font-size: 13px;
  border-top: solid 1px;
`

export const Statusbar = memo(() => {
  return (
    <Container className="zoomable-status-bar">
      统计
    </Container>
  )
})