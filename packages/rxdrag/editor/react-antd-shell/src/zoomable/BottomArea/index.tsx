import { memo, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { FloatNodeNav, ResizableRow } from "../../common"
import { usePropertyWidthState, useToolboxWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button, Divider, Space, Tabs, TabsProps } from "antd"
import { BorderOutlined, LeftOutlined, MinusOutlined, RightOutlined, SettingOutlined } from "@ant-design/icons"
import { DEFAULT_MARGIN, MINI_WIDGET_WIDTH } from "../consts"
import { ReundoIcons } from "./ReundoIcons"
import { useActivedDocument } from "@rxdrag/react-core"
import { AuxButtions } from "./AuxButtions"

const BottomShell = styled(ResizableRow)`
  position: absolute;
  left:${DEFAULT_MARGIN}px;
  bottom: ${DEFAULT_MARGIN}px;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
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

const BottomBar = styled.div`
  position: absolute;
  top:-32px;
  left:0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`

const Label = styled.div`
  display: flex;
  align-items: center;
`

const BottomActions = styled.div`
  pointer-events: all;
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

export const BottomArea = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [rightPinned, setRightPinned] = useState(false)
  const [leftPinned, setLeftPinned] = useState(false)
  const [height, setHeight] = useState(200)
  const [propertyWidth] = usePropertyWidthState()
  const [toolboxWidth] = useToolboxWidthState()
  const activedDocument = useActivedDocument()
  //const t = useSettersTranslate()

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: <Label>行为流</Label>,
        key: "logicflow",
        children: "应用级/设备端级别/模块级/场景级/循环级"
      },
      {
        label: <Label>脚本</Label>,
        key: "script",
        children: "脚本控制器"
      },
      {
        label: <Label>日志</Label>,
        key: "log",
        children: "日志"
      },
      //把快捷控制器附加到物料上，放在属性面板配置
      // {
      //   label: <Label>快捷</Label>,
      //   key: "shortcurt",
      //   children: "快捷控制器"
      // },
    ]
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


  return (
    <BottomShell
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
      <BottomBar>
        <FloatNodeNav />
        {
          activedDocument && <BottomActions>
            <ReundoIcons />
            <Divider type="vertical" />
            <AuxButtions />
          </BottomActions>
        }
      </BottomBar>
      <Tabs
        size="small"
        tabBarExtraContent={
          <Space>
            <Button
              type="text"
              size="small"
              icon={<SettingOutlined />}
            />
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
  )
})