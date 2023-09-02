import { memo } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { floatShadow } from "../../utils"
import { DEFAULT_MARGIN } from "../consts"

const PanelShell = styled(ResizableColumn)`
  position: absolute;
  top: 0;
  right: calc(100% + ${DEFAULT_MARGIN/2}px);
  height: calc(100% - ${DEFAULT_MARGIN * 2 + 48}px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
`

export const ExpandPanel = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  return (
    <PanelShell right width={300} minWidth={280} maxWidth={800}>
      {children}
    </PanelShell>
  )
})