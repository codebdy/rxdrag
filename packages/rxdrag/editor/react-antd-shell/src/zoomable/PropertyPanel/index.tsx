import { memo } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../utils"
import { Button } from "antd"
import { MinusOutlined } from "@ant-design/icons"

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
  color: ${props => props.theme.token?.colorText};
`

export const PropertyPanel = memo(() => {
  const [propertyWidth, setPropertyWidth] = usePropertyWidthState()

  return (
    <PanelShell
      right
      maxWidth={1000}
      minWidth={280}
      width={propertyWidth}
      onWidthChange={setPropertyWidth}
    >
      <Title>
        <span>
          属性
        </span>
        <Button size="small" type="text" icon={<MinusOutlined />} />
      </Title>
    </PanelShell>
  )
})