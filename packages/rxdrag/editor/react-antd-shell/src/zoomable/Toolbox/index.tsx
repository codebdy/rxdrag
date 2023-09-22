import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { ResizableColumn, SvgIcon } from "../../common"
import { useToolboxWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { DEFAULT_MARGIN, MINI_WIDGET_WIDTH } from "../consts"
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
  padding-right: 4px;
  box-sizing: border-box;
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
          icon={<SvgIcon>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em"><path d="M640 938.666667c-46.933333 0-85.333333-38.4-85.333333-85.333334v-213.333333c0-46.933333 38.4-85.333333 85.333333-85.333333h213.333333c46.933333 0 85.333333 38.4 85.333334 85.333333v213.333333c0 46.933333-38.4 85.333333-85.333334 85.333334h-213.333333z m0-277.333334v170.666667c0 12.8 8.533333 21.333333 21.333333 21.333333h170.666667c12.8 0 21.333333-8.533333 21.333333-21.333333v-170.666667c0-12.8-8.533333-21.333333-21.333333-21.333333h-170.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333zM170.666667 938.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334v-213.333333c0-46.933333 38.4-85.333333 85.333334-85.333333h213.333333c46.933333 0 85.333333 38.4 85.333333 85.333333v213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334H170.666667z m0-277.333334v170.666667c0 12.8 8.533333 21.333333 21.333333 21.333333h170.666667c12.8 0 21.333333-8.533333 21.333333-21.333333v-170.666667c0-12.8-8.533333-21.333333-21.333333-21.333333h-170.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333z m473.6-132.266666l-149.333334-149.333334c-34.133333-34.133333-34.133333-85.333333 0-119.466666l149.333334-149.333334c34.133333-34.133333 85.333333-34.133333 119.466666 0L917.333333 256c34.133333 34.133333 34.133333 85.333333 0 119.466667L768 529.066667c-17.066667 17.066667-38.4 25.6-59.733333 25.6-25.6 0-46.933333-8.533333-64-25.6z m46.933333-345.6l-119.466667 119.466666c-8.533333 8.533333-8.533333 21.333333 0 29.866667l119.466667 119.466667c8.533333 8.533333 21.333333 8.533333 29.866667 0l119.466666-119.466667c8.533333-8.533333 8.533333-21.333333 0-29.866667l-119.466666-119.466666c-4.266667-4.266667-8.533333-4.266667-17.066667-4.266667-4.266667-4.266667-8.533333 0-12.8 4.266667zM170.666667 469.333333c-46.933333 0-85.333333-38.4-85.333334-85.333333V170.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h213.333333c46.933333 0 85.333333 38.4 85.333333 85.333334v213.333333c0 46.933333-38.4 85.333333-85.333333 85.333333H170.666667z m0-277.333333v170.666667c0 12.8 8.533333 21.333333 21.333333 21.333333h170.666667c12.8 0 21.333333-8.533333 21.333333-21.333333v-170.666667c0-12.8-8.533333-21.333333-21.333333-21.333333h-170.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333z"></path></svg>
          </SvgIcon>}
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