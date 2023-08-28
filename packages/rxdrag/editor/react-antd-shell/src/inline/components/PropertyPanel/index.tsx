import { memo } from "react"
import styled from "styled-components"
import { PanelTitle } from "../Panel/PanelTitle"
import { Panel } from "../Panel"
import { WidgetNames } from "../../interfaces"
import { useClose } from "../../hooks/useClose"
import { useSettersTranslate } from "@rxdrag/react-core"
import { SettingsForm } from "../../../common"

const Container = styled(Panel).attrs({ name: WidgetNames.property })`
  right:8px;
  width: 320px;
`

export const PropertyPanel = memo(() => {
  const close = useClose(WidgetNames.property)
  const t = useSettersTranslate()

  return (
    <Container className="rx-property-panel">
      <PanelTitle onClose={close}>
        {t("properties")}
      </PanelTitle>
      <SettingsForm />
    </Container>
  )
})