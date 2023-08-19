import { memo } from "react"
import styled from "styled-components"
import { PanelTitle } from "../Panel/PanelTitle"
import { Panel } from "../Panel"

const Container = styled(Panel)`
  right:8px;
`

export const PropertyPanel = memo(() => {
  return (
    <Container className="rx-property-panel">
      <PanelTitle>
        属性
      </PanelTitle>
    </Container>
  )
})