import { memo } from "react"
import styled from "styled-components"

const ToolbarShell = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 16px;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.05);
  z-index: 1;
  background-color: ${props => props.theme.token?.colorBgBase};
`
export const Toolbar = memo((
  props: {
    title?: React.ReactNode,
    actions?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  const { children } = props
  return (
    <ToolbarShell className="zoomable-toobar">
      {children}
    </ToolbarShell>
  )
})