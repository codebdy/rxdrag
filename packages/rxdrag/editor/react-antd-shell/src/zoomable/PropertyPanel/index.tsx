import { memo, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ResizableColumn, SettingsForm } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button } from "antd"
import { DEFAULT_MARGIN, MINI_WIDGET_WIDTH } from "../consts"
import { propertyIcon } from "../../icons"
import { MinusOutlined, PushpinOutlined } from "@ant-design/icons"
import { useCurrentNode } from "@rxdrag/react-core"

const maxWidth = 1000
const minWidth = 300

const PanelShell = styled(ResizableColumn)`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  right: ${DEFAULT_MARGIN}px;
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
  .collapsed{
    opacity: 0;
  }
`

export const CloseButton = styled(Button).attrs({ icon: <MinusOutlined />, size: "small", type: "text" })`
  position: absolute;
  top:8px;
  right:8px;
`

export const PinButton = styled(Button).attrs({ icon: <PushpinOutlined />, size: "small" })`
  position: absolute;
  top:8px;
  right:40px;
`

export const PropertyPanel = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [pinned, setPinned] = useState(false);
  const [propertyWidth, setPropertyWidth] = usePropertyWidthState()
  const [oldeWidth, setOldWidth] = useState(propertyWidth)
  const currentNode = useCurrentNode()
  const oldeWidthRef = useRef(oldeWidth)
  oldeWidthRef.current = oldeWidth
  const setPropertyWidthRef = useRef(setPropertyWidth)
  setPropertyWidthRef.current = setPropertyWidth

  useEffect(() => {
    if (pinned) {
      return
    }
    if (!currentNode) {
      setCollapsed(true)
      setPropertyWidthRef.current(MINI_WIDGET_WIDTH)
    } else {
      setCollapsed(false)
      setPropertyWidthRef.current(oldeWidthRef.current)
    }
  }, [currentNode, pinned])

  const handleCollapse = useCallback(() => {
    setCollapsed(true)
    setOldWidth(propertyWidth)
    setPropertyWidth(MINI_WIDGET_WIDTH)
  }, [propertyWidth, setPropertyWidth])

  const handleOpen = useCallback(() => {
    setCollapsed(false)
    setPropertyWidth(oldeWidth)
  }, [oldeWidth, setPropertyWidth])

  const handleTogglePin = useCallback(() => {
    setPinned(pinned => !pinned)
  }, [])

  return (
    <PanelShell
      right
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={propertyWidth}
      onWidthChange={setPropertyWidth}
      className={collapsed ? "collapsed" : undefined}
      style={{
        height: collapsed ? 32 : undefined,
        minWidth: collapsed ? 32 : undefined,
      }}
    >
      {
        collapsed
          ? <Button
            type="text"
            disabled={!currentNode}
            icon={propertyIcon}
            onClick={handleOpen}
          />
          : <Container className={collapsed ? "collapsed" : undefined}>
            <SettingsForm />
            <CloseButton onClick={handleCollapse} />
            <PinButton type={pinned ? "default" : "text"} onClick={handleTogglePin} />
          </Container>
      }
    </PanelShell>
  )
})