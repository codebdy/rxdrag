import { memo, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { ResizableRow } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../utils"
import { Button, Space, Tabs } from "antd"
import { BorderOutlined, MinusOutlined, SettingOutlined } from "@ant-design/icons"
import { MINI_PRO_WIDTH } from "../consts"

const BottomShell = styled(ResizableRow)`
  position: fixed;
  left:16px;
  bottom: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  .ant-tabs-nav{
    padding: 0 16px;
    margin: 0;
  }
`

const ComponentNav = styled.div`
  position: absolute;
  top:-32px;
  left:0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const minHeight = 40

export const BottomArea = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [height, setHeight] = useState(200)
  const [propertyWidth] = usePropertyWidthState()

  const items = useMemo(() => {
    return [
      {
        label: "行为流",
        key: "logicflow",
        Children: collapsed ? <></> : "逻辑编排"
      },
      {
        label: "脚本",
        key: "script",
        Children: collapsed ? <></> : "脚本控制器"
      },
      {
        label: "快捷",
        key: "shortcurt",
        Children: collapsed ? <></> : "快捷控制器"
      },
    ]
  }, [collapsed])

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

  const rightSpace = useMemo(() => {
    if (propertyWidth <= MINI_PRO_WIDTH) {
      return 32
    }
    return propertyWidth + 48
  }, [propertyWidth])

  return (
    <BottomShell
      maxHeight={"calc(100vh - 100px)"}
      height={collapsed ? minHeight : height}
      minHeight={minHeight}
      style={{
        width: `calc(100% - ${rightSpace}px)`,
      }}
      onHeightChange={setHeight}
    >
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
      <ComponentNav>
        <div>导航</div>
        {/* <NavbarWidget /> */}
      </ComponentNav>
    </BottomShell>
  )
})