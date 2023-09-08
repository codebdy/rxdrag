import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { useToolboxWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button } from "antd"
import { DEFAULT_MARGIN, MINI_WIDGET_WIDTH } from "../consts"
import { AppstoreOutlined } from "@ant-design/icons"
import { CloseButton } from "../PropertyPanel"
import { CanvasFloatButton } from "../common"

const maxWidth = 1000
const minWidth = 300

const ToolboxShell = styled(ResizableColumn)`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  left: ${DEFAULT_MARGIN}px;
  height: calc(100% - ${DEFAULT_MARGIN * 2}px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  .ant-tabs-nav{
    user-select: none;
    &::before{
      border: 0;
    }
  }
  &.collapsed{
    opacity: 0;
    pointer-events: none;
  }
`

const MiniShell = styled.div`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  left: ${DEFAULT_MARGIN}px;
  &.hidden{
    opacity: 0;
    pointer-events: none;
  }
`

const Container = styled.div`
  flex:1;
  height: 0;
  display: flex;
  flex-flow: column;
  transition: opacity 0.3s;
  min-width: ${minWidth}px;
  min-height: calc(100% - ${DEFAULT_MARGIN * 2}px);
  transition: opacity 0.3s;

  .ant-tabs{
    flex:1;
    height: 0;
    display: flex;
    flex-flow: column;
    .ant-tabs-content-holder{
      flex:1;
      height: 0;
      overflow: auto;
    }
    padding-bottom: 8px;
  }
  .ant-tabs-nav{
    padding: 0 16px;
    margin: 0;
    user-select: none;
  }
`

export const Toolbox = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false)
  const [toolboxWidth, setToolboxWidth] = useToolboxWidthState()
  const [oldeWidth, setOldWidth] = useState(toolboxWidth)

  const handleCollapse = useCallback(() => {
    setCollapsed(true)
    setOldWidth(toolboxWidth)
    setToolboxWidth(MINI_WIDGET_WIDTH)
  }, [toolboxWidth, setToolboxWidth])

  const handleOpen = useCallback(() => {
    setCollapsed(false)
    setToolboxWidth(oldeWidth)
  }, [oldeWidth, setToolboxWidth])

  return (
    <>
      <MiniShell className={collapsed ? undefined : "hidden"}>
        <CanvasFloatButton
          icon={<AppstoreOutlined />}
          onClick={handleOpen}
        />
      </MiniShell>
      <ToolboxShell
        maxWidth={maxWidth}
        minWidth={minWidth}
        width={toolboxWidth}
        onWidthChange={setToolboxWidth}
        style={{
          height: collapsed ? 32 : undefined,
          minWidth: collapsed ? 32 : undefined,
        }}
        className={collapsed ? "collapsed" : undefined}
      >
        <Container>
          {children}
          <CloseButton onClick={handleCollapse} />
        </Container>
      </ToolboxShell>
    </>
  )
})