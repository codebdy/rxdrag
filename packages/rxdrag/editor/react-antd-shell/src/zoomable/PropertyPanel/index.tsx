import { memo } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"

const PanelShell = styled(ResizableColumn)`
  position: fixed;
  top: 64px;
  right: 16px;
  border-radius: 8px;
  height: calc(100% - 80px);
 background-color: ${props => props.theme.token?.colorBgBase};
`

export const PropertyPanel = memo(() => {
  return (
    <PanelShell maxWidth={1000} minWidth={280} width={300} right>
      dd
    </PanelShell>
  )
})