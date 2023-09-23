import { ResizableRow, floatShadow, propertyIcon } from "@rxdrag/react-antd-shell"
import { Button, Space, Tabs, TabsProps } from "antd"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SubFlows } from "./SubFlows"
import { BorderOutlined, MinusOutlined } from "@ant-design/icons"

const BottomShell = styled(ResizableRow)`
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
    padding-bottom: 8px;
  }
  .ant-tabs-nav{
    padding: 0 16px;
    margin: 0;
    user-select: none;
    &::before{
      border: 0;
    }
  }
`

const Label = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.token.colorTextSecondary};
  justify-content: flex-start;
  .anticon{
    margin-right: 4px !important;
  }

`
const minHeight = 40

export const BottomConsole = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [height, setHeight] = useState(200)
  const handleTabClick = useCallback(() => {
    setCollapsed(false)
  }, [])
  
  const handleToggleHeight = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])
  
  useEffect(() => {
    if (height <= (minHeight + 5)) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [height])

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: <Label onClick={handleTabClick}>
          行为流
        </Label>,
        key: "logicflow",
        children: <SubFlows />
      },
      {
        label: <Label onClick={handleTabClick}>
          脚本
        </Label>,
        key: "script",
        children: "脚本控制器"
      },
      //把快捷控制器附加到物料上，放在属性面板配置
      // {
      //   label: <Label>快捷</Label>,
      //   key: "shortcurt",
      //   children: "快捷控制器"
      // },
    ]
  }, [handleTabClick])
  
  return (
    <BottomShell
      maxHeight={"calc(100vh - 100px)"}
      height={collapsed ? minHeight : height}
      minHeight={minHeight}
      onHeightChange={setHeight}
    >
      <Tabs
        size="small"
        tabBarExtraContent={
          <Space>
            <Button
              type="text"
              size="small"
              icon={<span style={{ fontSize: 12 }}>{propertyIcon}</span>}
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
    </BottomShell>
  )
})