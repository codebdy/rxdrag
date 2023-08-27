import { memo } from "react"
import styled from "styled-components"
import { PanelTitle } from "../Panel/PanelTitle"
import { Panel } from "../Panel"
import { WidgetNames } from "../../interfaces"
import { useClose } from "../../hooks/useClose"

const Container = styled(Panel).attrs({ name: WidgetNames.outline })`
  left:${8 + 260}px;
`

export const OutlinePanel = memo(() => {
  const close = useClose(WidgetNames.outline)
  return (
    <Container className="rx-property-panel">
      <PanelTitle onClose={close}>
        大纲
      </PanelTitle>
    </Container>
  )
})