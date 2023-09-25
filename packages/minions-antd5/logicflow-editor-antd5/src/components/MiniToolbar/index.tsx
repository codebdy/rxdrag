import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons"
import { useZoom, useZoomIn, useZoomOut, MIN_ZOOM, MAX_ZOOM, useShowMap } from "@rxdrag/minions-logicflow-editor"
import { Button, Space } from "antd"
import { memo, useCallback } from "react"
import styled from "styled-components"
import { zoomResetIcon, mapIcon } from "../FlowToolbar/icons"


const Container = styled.div`
  position: absolute;
  width: 40px;
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  right: 16px;
  top: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
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