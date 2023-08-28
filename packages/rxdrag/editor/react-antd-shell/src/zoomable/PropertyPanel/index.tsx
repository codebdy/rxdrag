import { memo } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { usePropertyWidthState } from "../contexts"

const PanelShell = styled(ResizableColumn)`
  position: fixed;
  top: 64px;
  right: 16px;
  border-radius: 8px;
  height: calc(100% - 80px);
 background-color: ${props => props.theme.token?.colorBgBase};
`

export const PropertyPanel = memo(() => {
  const [propertyWidth, setPropertyWidth] = usePropertyWidthState()

  return (
    <PanelShell
      right
      maxWidth={1000}
      minWidth={280}
      width={propertyWidth}
      onWidthChange={setPropertyWidth}
    >
      dd
    </PanelShell>
  )
})