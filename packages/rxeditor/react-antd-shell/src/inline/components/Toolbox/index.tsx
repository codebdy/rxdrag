import { memo } from "react"
import styled from "styled-components"
import { PanelTitle } from "../Panel/PanelTitle"
import { Panel } from "../Panel"
import { WidgetNames } from "../../interfaces"
import { useClose } from "../../hooks/useClose"
import { useSettersTranslate } from "@rxdrag/react-core"

const Container = styled(Panel).attrs({ name: WidgetNames.toolbox })`
  left:8px;
`

const PannelContent = styled.div`
  flex:1;
  display: flex;
  height: 0;
  overflow: auto;
`

export const Toolbox = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  const t = useSettersTranslate()
  const close = useClose(WidgetNames.toolbox)
  return (
    <Container className="rx-widget-toolbox">
      <PanelTitle onClose={close}>
        {t("components")}
      </PanelTitle>
      <PannelContent>
        {
          children
        }
      </PannelContent>
    </Container>
  )
})