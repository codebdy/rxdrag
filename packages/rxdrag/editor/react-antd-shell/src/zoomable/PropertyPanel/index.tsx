import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../utils"
import { Button } from "antd"
import { BorderOutlined, MinusOutlined } from "@ant-design/icons"
import { MINI_PRO_WIDTH } from "../consts"

const PanelShell = styled(ResizableColumn)`
  position: fixed;
  top: 64px;
  right: 16px;
  border-radius: 8px;
  height: calc(100% - 80px);
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  padding-right: 8px;
  color: ${props => props.theme.token?.colorText};
`

export const PropertyPanel = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [propertyWidth, setPropertyWidth] = usePropertyWidthState()
  const [oldeWidth, setOldWidth] = useState(propertyWidth)

  const handleCollapse = useCallback(() => {
    setCollapsed(true)
    setOldWidth(propertyWidth)
    setPropertyWidth(MINI_PRO_WIDTH)
  }, [propertyWidth, setPropertyWidth])

  const handleOpen = useCallback(() => {
    setCollapsed(false)
    setPropertyWidth(oldeWidth)
  }, [oldeWidth, setPropertyWidth])

  return (
    <PanelShell
      right
      maxWidth={1000}
      minWidth={280}
      width={propertyWidth}
      onWidthChange={setPropertyWidth}
      style={{
        height: collapsed ? 32 : undefined,
        width: collapsed ? 32 : undefined,
        minWidth: collapsed ? 32 : undefined,
      }}
    >
      {
        collapsed
          ? <Button
            icon={<BorderOutlined />}
            onClick={handleOpen}
          />
          : <Title>
            <span>
              属性
            </span>
            <Button
              size="small"
              type="text"
              icon={<MinusOutlined />}
              onClick={handleCollapse}
            />
          </Title>
      }

    </PanelShell>
  )
})