import { Space } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { AimOutlined, AppstoreOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { usePropertyWidthState } from "../contexts"
import { ZoomButtons } from "./ZoomButtons"
import { CanvasFloatButton } from "../common/FloatButton"

const Container = styled.div`
  position: fixed;
  top: 64px;
  right: 400px;
  display: flex;
  flex-flow: column;
  transition: all 0.3s;
`

export const ShortcutActions = memo((
  props: {
    scrolled?: boolean,
    zoom: number,
    onZoomChange: (zoom: number) => void
    onResetScroll: () => void,
  }
) => {
  const { scrolled, zoom, onZoomChange, onResetScroll } = props
  const [propertyWidth] = usePropertyWidthState()

  return (
    <Container
      className="rx-shortcut-actions"
      style={{
        right: propertyWidth + 24
      }}
    >
      <Space direction="vertical">
        <CanvasFloatButton icon={<PlayCircleOutlined />} />
        <CanvasFloatButton icon={<AppstoreOutlined />} />
        <ZoomButtons zoom={zoom} onZoomChange={onZoomChange} />
        {/* <FloatButton icon={<HistoryOutlined />}/> */}
        <CanvasFloatButton disabled={!scrolled} icon={<AimOutlined />} onClick={onResetScroll} />
      </Space>
    </Container>
  )
})