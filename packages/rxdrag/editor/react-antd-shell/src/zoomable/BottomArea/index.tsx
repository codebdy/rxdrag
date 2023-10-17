import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { FloatNodeNav, ResizableRow } from "../../common"
import { usePropertyWidthState, useToolboxWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button, Divider, Space, Tabs, TabsProps } from "antd"
import { BorderOutlined, LeftOutlined, MinusOutlined, RightOutlined } from "@ant-design/icons"
import { DEFAULT_MARGIN, MINI_WIDGET_WIDTH } from "../consts"
import { ReundoIcons } from "./ReundoIcons"
import { useActivedDocument } from "@rxdrag/react-core"
import { AuxButtions } from "./AuxButtions"
import { JsonCodeDialog } from "./JsonCodeDialog"

const BottomShell = styled(ResizableRow)`
  position: absolute;
  left:${DEFAULT_MARGIN}px;
  bottom: ${DEFAULT_MARGIN}px;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
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
    .ant-tabs-content{
      height: 100%;
      .ant-tabs-tabpane{
        height: 100%;
      }
    }
    padding-bottom: 4px;
  }
  .ant-tabs-nav{
    padding: 0 16px;
    margin: 0;
    user-select: none;
    &::before{
      //border: 0;
    }
  }
`

const MiniShell = styled.div`
  position: absolute;
  left:${DEFAULT_MARGIN}px;
  bottom: ${DEFAULT_MARGIN}px;
`

const NavBar = styled.div`
  position: absolute;
  top:-30px;
  left:0;
  display: flex;
  align-items: center;
`
const Toolbar = styled.div`
  position: absolute;
  top:-34px;
  right:0;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.token.colorBgContainer};
  border-radius: 8px;
  box-shadow: ${floatShadow};
  height: 32px;
  padding: 0 4px;
  //transform: translateX(-50%);
`

const BottomActions = styled.div`
  pointer-events: all;
  display: flex;
  align-items: center;
`

const PinButton = styled(Button).attrs({ shape: "circle", size: "small", })`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, ${props => props.theme?.mode === "light" ? 0.05 : 0.25});
  //border: 0;
  color: ${props => props.theme.token?.colorTextSecondary};
`

const LeftPinButton = styled(PinButton)`
  right: auto;
  left:0;
  transform: translate(-50%, -50%);
`

const minHeight = 40

export const BottomArea = memo((
  props: {
    items?: TabsProps['items'],
    extra?: React.ReactNode,
    addon?: React.ReactNode,
  }
) => {
  const { items, addon, extra } = props;
  const [collapsed, setCollapsed] = useState(false)
  const [rightPinned, setRightPinned] = useState(false)
  const [leftPinned, setLeftPinned] = useState(false)
  const [height, setHeight] = useState(200)
  const [propertyWidth] = usePropertyWidthState()
  const [toolboxWidth] = useToolboxWidthState()
  const activedDocument = useActivedDocument()
  //const t = useSettersTranslate()

  const handleTabClick = useCallback(() => {
    setCollapsed(false)
  }, [])


  useEffect(() => {
    if (height <= (minHeight + 5)) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [height])

  const handleToggleHeight = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const handleToggleRightPin = useCallback(() => {
    setRightPinned(pinned => !pinned)
  }, [])

  const handleToggleLeftPin = useCallback(() => {
    setLeftPinned(pinned => !pinned)
  }, [])

  const propertyMini = useMemo(() => propertyWidth <= MINI_WIDGET_WIDTH, [propertyWidth])
  const toolboxMini = useMemo(() => toolboxWidth <= MINI_WIDGET_WIDTH, [toolboxWidth])

  const rightSpace = useMemo(() => {
    if (propertyMini || (rightPinned && !collapsed)) {
      return DEFAULT_MARGIN
    }
    return propertyWidth + DEFAULT_MARGIN * 2
  }, [collapsed, rightPinned, propertyMini, propertyWidth])

  const leftSpace = useMemo(() => {
    if (toolboxMini || (leftPinned && !collapsed)) {
      return DEFAULT_MARGIN
    }
    return toolboxWidth + DEFAULT_MARGIN * 2
  }, [collapsed, leftPinned, toolboxMini, toolboxWidth])


  const buttons = useMemo(() => {
    return (
      <BottomActions>
        <ReundoIcons />
        <Divider type="vertical" />
        <AuxButtions />
        <Divider type="vertical" />
        <JsonCodeDialog />
        {
          addon
        }
      </BottomActions>
    )
  }, [addon])

  return (
    items?.length
      ? <BottomShell
        maxHeight={"calc(100vh - 100px)"}
        height={collapsed ? minHeight : height}
        minHeight={minHeight}
        style={{
          width: `calc(100% - ${rightSpace + leftSpace}px)`,
          zIndex: 1,
          left: leftSpace,
        }}
        onHeightChange={setHeight}
      >
        <NavBar>
          <FloatNodeNav />
        </NavBar>
        <Toolbar>
          {
            activedDocument && buttons
          }
        </Toolbar>
        {
          !!items?.length &&
          <Tabs
            size="small"
            onTabClick={handleTabClick}
            tabBarExtraContent={
              <Space>
                {extra}
                <Button
                  type="text"
                  size="small"
                  icon={
                    collapsed
                      ? <BorderOutlined />
                      : <MinusOutlined />
                  }
                  onClick={handleToggleHeight}
                />
              </Space>
            }
            items={items}
          />
        }
        {
          !propertyMini && !collapsed &&
          <PinButton
            icon={
              rightPinned
                ? <LeftOutlined />
                : <RightOutlined />
            }
            onClick={handleToggleRightPin}
          />
        }

        {
          !toolboxMini && !collapsed &&
          <LeftPinButton
            icon={
              leftPinned
                ? <RightOutlined />
                : <LeftOutlined />
            }
            onClick={handleToggleLeftPin}
          />
        }
      </BottomShell>
      : <MiniShell
        style={{
          width: `calc(100% - ${rightSpace + leftSpace}px)`,
          zIndex: 1,
          left: leftSpace,
        }}
      >
        <NavBar>
          <FloatNodeNav />
        </NavBar>
        <Toolbar>
          {
            activedDocument && buttons
          }
        </Toolbar>
      </MiniShell>
  )
})