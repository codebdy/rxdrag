import { Button, Divider, Space } from "antd"
import { useToken } from "antd/es/theme/internal";
import { memo, useCallback, useMemo, useState } from "react"
import { redoIcon, undoIcon } from "react-shells/ant5/icons";
import styled from "styled-components";
import { Members } from "./Members";
import { PropertyBox } from "./PropertyBox";
import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons";
import { mapIcon, nodeIcon, outputIcon } from "./icons";
import { Logic } from "./Logic";
import { useCreateGraph } from "./hooks/useCreateGraph";
import { ReacionsEditorContext } from "./contexts";

const SytledContent = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  border: solid 1px;
`
const LeftArea = styled.div`
  width: 220px;
  border-right: solid 1px;
  padding: 8px;
`
const CenterArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
`
const Toolbar = styled.div`
  display: flex;
  padding: 0 16px;
  height: 40px;
  align-items: center;
  border-bottom: solid 1px;
`
const CanvasContainer = styled.div`
  flex: 1;
`
const MiniMapContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 160px;
  border: solid 1px;
  left: 16px;
  bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center; 
  overflow: hidden;
  .x6-widget-minimap{
    background-color: transparent;
    overflow: visible;
    .x6-graph{
      box-shadow: none;
    }
  }
`

const RightArea = styled.div`
  width: 220px;
  border-left: solid 1px;
  display: flex;
  flex-flow: column;
`

const ToolbarButton = styled((props) => <Button type="text" size="small" {...props} />)`
`

const ToobarCenter = styled.div`
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ReactionsEditor = memo(() => {
  const [showMap, setShowMap] = useState(false)
  const [, token] = useToken()
  const graph = useCreateGraph()
  const params = useMemo(() => {
    return {
      graph
    }
  }, [graph])

  const handleTaggleMap = useCallback(() => {
    setShowMap((show) => !show)
  }, [])

  return (
    <ReacionsEditorContext.Provider value={params}>
      <SytledContent style={{ borderColor: token.colorBorder }}>
        <LeftArea style={{ borderColor: token.colorBorder }}>
          <Members />
        </LeftArea>
        <CenterArea>
          <Toolbar style={{ borderColor: token.colorBorder }}>
            <Space>
              <ToolbarButton icon={<span role="img" className="anticon">{undoIcon}</span>}></ToolbarButton>
              <ToolbarButton disabled icon={<span role="img" className="anticon">{redoIcon}</span>}></ToolbarButton>
              <Divider type="vertical" />
              <ToolbarButton icon={<span role="img" className="anticon"><svg width="1rem" height="1rem" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
              </svg></span>}></ToolbarButton>
            </Space>
            <ToobarCenter>
            </ToobarCenter>
            <Space>
              <ToolbarButton icon={nodeIcon}></ToolbarButton>
              <ToolbarButton icon={outputIcon}></ToolbarButton>
              <Divider type="vertical" />
              <ToolbarButton
                icon={mapIcon}
                type={showMap ? "default" : "text"}
                onClick={handleTaggleMap}
              ></ToolbarButton>
              <ToolbarButton icon={<ZoomOutOutlined />}></ToolbarButton>
              <ToolbarButton icon={<ZoomInOutlined />}></ToolbarButton>
            </Space>
          </Toolbar>
          <CanvasContainer id="reactions-canvas-container" style={{ backgroundColor: token.colorBgContainer }} >
            <Logic />
          </CanvasContainer>
          <MiniMapContainer
            id="reactions-minimap-container"
            style={{
              borderColor: token.colorBorder,
              backgroundColor: token.colorBgContainer,
              display: showMap ? "flex" : "none"
            }}
          />
        </CenterArea>
        <RightArea style={{ borderColor: token.colorBorder }}>
          <PropertyBox />
        </RightArea>
      </SytledContent>
    </ReacionsEditorContext.Provider>
  )
})