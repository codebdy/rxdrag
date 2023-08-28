import { memo } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"

const PanelShell = styled(ResizableColumn)`
  border-left: solid 1px ${props => props.theme.token?.colorBorder};
`

export const PropertyPanel = memo(() => {
  return (
    <PanelShell maxWidth={1000} minWidth={300} right>
      dd
    </PanelShell>
  )
})