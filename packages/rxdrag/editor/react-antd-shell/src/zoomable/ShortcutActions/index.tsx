import { Space } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { AimOutlined, AppstoreOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { usePropertyWidthState } from "../contexts"
import { ZoomButtons } from "./ZoomButtons"
import { CanvasFloatButton } from "../common/FloatButton"
import { Toolbox } from "./Toolbox"

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
    toolbox?: React.ReactNode,
  }
) => {
  const { scrolled, zoom, onZoomChange, onResetScroll, toolbox } = props
  const [toolboxOpen, setToolboxOpen] = useState<boolean>()
  const [propertyWidth] = usePropertyWidthState()

  const handleOpen = useCallback(() => {
    setToolboxOpen(true)
  }, [])

  const handleOpenChange = useCallback((open?: boolean) => {
    setToolboxOpen(open)
  }, [])

  return (
    <>
      <Container
        className="rx-shortcut-actions"
        style={{
          right: propertyWidth + 24
        }}
      >
        <Space direction="vertical">
          <CanvasFloatButton icon={<PlayCircleOutlined />} />
          <CanvasFloatButton
            icon={<AppstoreOutlined />}
            onClick={handleOpen}
          />
          <ZoomButtons zoom={zoom} onZoomChange={onZoomChange} />
          {/* <FloatButton icon={<HistoryOutlined />}/> */}
          <CanvasFloatButton disabled={!scrolled} icon={<AimOutlined />} onClick={onResetScroll} />
        </Space>
      </Container>
      <Toolbox
        open={toolboxOpen}
        onOpenChange={handleOpenChange}
      >
        {toolbox ? toolbox : "please add toolbox"}
      </Toolbox>
    </>
  )
})