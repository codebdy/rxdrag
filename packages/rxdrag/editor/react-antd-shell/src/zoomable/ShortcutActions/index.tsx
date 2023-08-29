import { Button, Space } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { floatShadow } from "../utils"
import { AimOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { usePropertyWidthState } from "../contexts"
import { ZoomButtons } from "./ZoomButtons"

const Container = styled.div`
  position: fixed;
  top: 64px;
  right: 400px;
  display: flex;
  flex-flow: column;
  transition: all 0.3s;
`

const FloatButton = styled(Button).attrs({ size: "large" })`
  box-shadow: ${floatShadow};
  border: 0;
`

export const ShortcutActions = memo(() => {
  const [propertyWidth] = usePropertyWidthState()

  return (
    <Container
      className="rx-shortcut-actions"
      style={{
        right: propertyWidth + 32
      }}
    >
      <Space direction="vertical">
        <FloatButton icon={<PlayCircleOutlined />} />
        <ZoomButtons />
        <FloatButton icon={<AimOutlined />} />
      </Space>
    </Container>
  )
})