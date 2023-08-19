import { memo } from "react"
import styled from "styled-components"
import { PanelTitle } from "../Panel/PanelTitle"
import { Panel } from "../Panel"
import { WidgetNames } from "../../interfaces"
import { useClose } from "../../hooks/useClose"

const Container = styled(Panel).attrs({ name: WidgetNames.toolbox })`
  left:8px;
`

export const Toolbox = memo(() => {
  const close = useClose(WidgetNames.toolbox)
  return (
    <Container className="rx-widget-toolbox">
      <PanelTitle onClose={close}>
        工具箱
      </PanelTitle>
    </Container>
  )
})