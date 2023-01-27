import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons"
import { Button, Divider, Space } from "antd"
import { memo, useCallback } from "react"
import { undoIcon, redoIcon } from "react-shells/ant5/icons"
import styled from "styled-components"
import { mapIcon } from "../../../../../../icons/reactions"
import { useEditorState } from "../../hooks/useEditorState"
import { useZoomIn } from "../../hooks/useZoomIn"
import { useZoomOut } from "../../hooks/useZoomOut"
import { MAX_ZOOM, MIN_ZOOM } from "../../utils"

const StyledToolbar = styled.div`
  display: flex;
  padding: 0 16px;
  height: 40px;
  align-items: center;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
`

const ToolbarButton = styled((props) => <Button type="text" size="small" {...props} />)`
`

const ToobarCenter = styled.div`
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Toolbar = memo((
  props: {
    showMap?: boolean,
    toggleShowMap?: () => void
  }
) => {
  const { showMap, toggleShowMap } = props
  const { selected, zoom, graph } = useEditorState()
  const handleRemove = useCallback(() => {
    selected && graph?.getCellById(selected)?.remove()
  }, [graph, selected])

  const zoomIn = useZoomIn()
  const zoomOut = useZoomOut()

  return (
    <StyledToolbar>
      <Space>
        <ToolbarButton icon={<span role="img" className="anticon">{undoIcon}</span>}></ToolbarButton>
        <ToolbarButton disabled icon={<span role="img" className="anticon">{redoIcon}</span>}></ToolbarButton>
        <Divider type="vertical" />
        <ToolbarButton
          disabled={!selected}
          icon={<span role="img" className="anticon"><svg width="1rem" height="1rem" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
          </svg></span>}
          onClick={handleRemove}
        ></ToolbarButton>
      </Space>
      <ToobarCenter>
      </ToobarCenter>
      <Space>
        <ToolbarButton
          icon={mapIcon}
          type={showMap ? "default" : "text"}
          onClick={toggleShowMap}
        ></ToolbarButton>
        <ToolbarButton
          icon={<ZoomOutOutlined />}
          disabled={zoom === MIN_ZOOM}
          onClick={zoomOut}
        ></ToolbarButton>
        <ToolbarButton
          icon={<ZoomInOutlined />}
          disabled={zoom === MAX_ZOOM}
          onClick={zoomIn}
        ></ToolbarButton>
      </Space>
    </StyledToolbar>
  )
})