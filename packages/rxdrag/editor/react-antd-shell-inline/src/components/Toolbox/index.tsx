import { memo } from "react"
import styled from "styled-components"
import { PanelTitle } from "../PanelTitle"
import { Panel } from "../Panel"

const Container = styled(Panel)`
  left:8px;
`

export const Toolbox = memo(() => {
  return (
    <Container className="rx-widget-toolbox">
      <PanelTitle>
        工具箱
      </PanelTitle>
    </Container>
  )
})