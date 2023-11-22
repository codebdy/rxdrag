import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons"
import { useZoom, useZoomIn, useZoomOut, MIN_ZOOM, MAX_ZOOM, useShowMap } from "@rxdrag/minions-logicflow-editor"
import { Button, GlobalToken, Space } from "antd"
import { memo, useCallback } from "react"
import styled from "styled-components"
import { zoomResetIcon, mapIcon } from "../FlowToolbar/icons"

export const floatShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `1px 1px 8px 4px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.05 : 0.25})`


const Container = styled.div`
  position: absolute;
  width: 40px;
  border: ${props => props.theme.token?.colorBorderSecondary} solid 1px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  right: 16px;
  top: 16px;
  border-radius: 8px;
  box-shadow: ${floatShadow};
  display: flex;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;
`
const ToolbarButton = styled((props) => <Button type="text" {...props} />)`
`

export const MiniToolbar = memo(() => {
  const { zoom, setZoom } = useZoom()
  const zoomIn = useZoomIn()
  const zoomOut = useZoomOut()
  const { showMap, setShowMap } = useShowMap()
  const toggleShowMap = useCallback(() => {
    setShowMap(!showMap)
  }, [setShowMap, showMap])
  const handleZoomReset = useCallback(() => {
    setZoom(1)
  }, [setZoom])
  return (<Container className="logicflow-editor-mini-toolbar">
    <Space direction="vertical">
      <ToolbarButton
        icon={<ZoomInOutlined />}
        disabled={zoom === MAX_ZOOM}
        onClick={zoomIn}
      ></ToolbarButton>
      <ToolbarButton
        icon={zoomResetIcon}
        disabled={zoom === 1}
        onClick={handleZoomReset}
      ></ToolbarButton>
      <ToolbarButton
        icon={<ZoomOutOutlined />}
        disabled={zoom === MIN_ZOOM}
        onClick={zoomOut}
      ></ToolbarButton>
      <ToolbarButton
        icon={mapIcon}
        type={showMap ? "default" : "text"}
        onClick={toggleShowMap}
      ></ToolbarButton>
    </Space>
  </Container>)
})