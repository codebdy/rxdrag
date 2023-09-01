import { memo, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { FloatNodeNav, OperationHistory, OutlineTree, ResizableRow, SvgIcon } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button, Divider, Space, Tabs, TabsProps } from "antd"
import { BorderOutlined, LeftOutlined, MinusOutlined, RightOutlined, SettingOutlined } from "@ant-design/icons"
import { MINI_PRO_WIDTH } from "../consts"
import { ReundoIcons } from "./ReundoIcons"
import { useActivedDocument, useSettersTranslate } from "@rxdrag/react-core"
import { AuxButtions } from "./AuxButtions"
import { historyIcon, outlineIcon } from "../../icons"

const BottomShell = styled(ResizableRow)`
  position: absolute;
  left:16px;
  bottom: 16px;
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
`

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
`

const BottomActions = styled.div`
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

const minHeight = 40

export const BottomArea = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [height, setHeight] = useState(200)
  const [propertyWidth] = usePropertyWidthState()
  const activedDocument = useActivedDocument()
  const t = useSettersTranslate()

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: <Label>行为流</Label>,
        key: "logicflow",
        children: "逻辑编排"
      },
      {
        label: <Label>脚本</Label>,
        key: "script",
        children: "脚本控制器"
      },
      {
        label: <Label>快捷</Label>,
        key: "shortcurt",
        children: "快捷控制器"
      },
      {
        label: <Label><SvgIcon>{outlineIcon}</SvgIcon> {t("outline")}</Label>,
        key: "outline",
        children: <OutlineTree />
      },
      {
        label: <Label><SvgIcon>{historyIcon}</SvgIcon> {t("history")}</Label>,
        key: "history",
        children: collapsed ? <></> : <OperationHistory />
      },
    ]
  }, [collapsed, t])

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

  const handleTogglePin = useCallback(() => {
    setPinned(pinned => !pinned)
  }, [])

  const propertyMini = useMemo(() => propertyWidth <= MINI_PRO_WIDTH, [propertyWidth])

  const rightSpace = useMemo(() => {
    if (propertyMini || (pinned && !collapsed)) {
      return 32
    }
    return propertyWidth + 48
  }, [collapsed, pinned, propertyMini, propertyWidth])

  return (
    <BottomShell
      maxHeight={"calc(100vh - 100px)"}
      height={collapsed ? minHeight : height}
      minHeight={minHeight}
      style={{
        width: `calc(100% - ${rightSpace}px)`,
        zIndex: 1,
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
            pinned
              ? <LeftOutlined />
              : <RightOutlined />
          }
          onClick={handleTogglePin}
        />
      }
    </BottomShell>
  )
})