import { memo, useMemo, useState } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { floatShadow } from "../../utils"
import { DEFAULT_MARGIN } from "../consts"

const PanelShell = styled(ResizableColumn)`
  position: absolute;
  top: 0;
  right: calc(100% + ${DEFAULT_MARGIN / 2}px);
  height: calc(100% - ${DEFAULT_MARGIN * 2 + 48}px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  padding-bottom: 8px;
  pointer-events: all;
  &.collapsed{
    pointer-events: none;
    box-shadow: none;
    opacity: 0;
  }
`

export const ExpandPanel = memo((
  props: {
    collapsed?: boolean,
    children?: React.ReactNode
  }
) => {
  const { collapsed, children } = props;
  const [width, setWidth] = useState(300);
  const minWidth = useMemo(() => !collapsed ? 280 : 0, [collapsed])
  const realWidth = useMemo(() => !collapsed ? width : 0, [collapsed, width])

  return (
    <PanelShell
      className={collapsed ? "collapsed" : undefined}
      right
      width={realWidth}
      minWidth={minWidth}
      maxWidth={800}
      onWidthChange={setWidth}
    >
      {children}
    </PanelShell>
  )
})