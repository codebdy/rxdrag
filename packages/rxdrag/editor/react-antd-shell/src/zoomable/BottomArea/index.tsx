import { memo, useMemo } from "react"
import styled from "styled-components"
import { ResizableRow } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../utils"
import { Button, Space, Tabs } from "antd"
import { MinusOutlined, SettingOutlined } from "@ant-design/icons"

const BottomShell = styled(ResizableRow)`
  position: fixed;
  left:16px;
  bottom: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  .ant-tabs-nav{
    padding: 0 16px;
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

export const BottomArea = memo(() => {
  const [propertyWidth] = usePropertyWidthState()

  const items = useMemo(() => {
    return [
      {
        label: "行为流",
        key: "logicflow",
        Children: "逻辑编排"
      },
      {
        label: "脚本",
        key: "script",
        Children: "脚本控制器"
      },
      {
        label: "快捷",
        key: "shortcurt",
        Children: "快捷控制器"
      },
    ]
  }, [])

  return (
    <BottomShell
      maxHeight={"calc(100vh - 100px)"}
      minHeight={40}
      style={{ width: `calc(100% - ${propertyWidth + 48}px)` }}
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
              icon={<MinusOutlined />}
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