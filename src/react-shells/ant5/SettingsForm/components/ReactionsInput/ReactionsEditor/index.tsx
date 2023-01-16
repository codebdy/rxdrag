import { Graph } from "@antv/x6";
import { Button, Divider, Space } from "antd"
import { useToken } from "antd/es/theme/internal";
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { redoIcon, undoIcon } from "react-shells/ant5/icons";
import styled from "styled-components";
import { useAddNodes } from "./hooks/useAddNodes";
import { Selection } from '@antv/x6-plugin-selection'
import { Members } from "./Members";
import { PropertyBox } from "./PropertyBox";
import { MiniMap } from "@antv/x6-plugin-minimap";
import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons";
import { config } from "./config";
import { mapIcon } from "./icons";
import { Logic } from "./Logic";

const SytledContent = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  border: solid 1px;
  .node {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #111;
    color: #fff;
    border: 1px solid #c2c8d5;
    border-left: 4px solid #5F95FF;
    border-radius: 4px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  }
  .node img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 8px;
  }
  .node .label {
    display: inline-block;
    flex-shrink: 0;
    width: 104px;
    margin-left: 8px;
    color: #fff;
    font-size: 12px;
  }
  .node .status {
    flex-shrink: 0;
  }
  .node.success {
    border-left: 4px solid #52c41a;
  }
  .node.failed {
    border-left: 4px solid #ff4d4f;
  }
  .node.running .status img {
    animation: spin 1s linear infinite;
  }
  .x6-node-selected .node {
    border-color: #1890ff;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #d4e8fe;
  }
  .x6-node-selected .node.success {
    border-color: #52c41a;
    border-radius: 2px;
    box-shadow: 0 0 0 4px rgba(22,104,220, 0.5);
  }
  .x6-node-selected .node.failed {
    border-color: #ff4d4f;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #fedcdc;
  }
  .x6-edge:hover path:nth-child(2){
    stroke: #1890ff;
    stroke-width: 1px;
  }

  .x6-edge-selected path:nth-child(2){
    stroke: #1890ff;
    stroke-width: 1.5px !important;
  }

  @keyframes running-line {
    to {
      stroke-dashoffset: -1000;
    }
  }
  @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }
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
export const ReactionsEditor = memo(() => {
  const [showMap, setShowMap] = useState(true)
  const [graph, setGraph] = useState<Graph>()
  const canvasRef = useRef<HTMLDivElement>(null)
  const miniMapRef = useRef<HTMLDivElement>(null)
  const [, token] = useToken()
  useAddNodes(graph)
  useEffect(() => {
    // 画布
    const graph: Graph = new Graph({
      container: canvasRef.current!,
      ...config,
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'algo-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet({ magnet }) {
          return magnet.getAttribute('port-group') !== 'top'
        },
        createEdge() {
          return graph.createEdge({
            shape: 'dag-edge',
            zIndex: -1,
          })
        },
      },
    })

    graph.use(new Selection({
      enabled: true,
      multiple: true,
      rubberEdge: true,
      rubberNode: true,
      modifiers: 'shift',
      rubberband: true,
    }))
    graph.use(
      new MiniMap({
        container: miniMapRef.current || undefined,
        width: 180,
        height: 80
      })
    );
    setGraph(graph)

    return () => {
      graph.dispose()
    }
  }, [])

  const handleTaggleMap = useCallback(() => {
    setShowMap((show) => !show)
  }, [])

  return (
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
          <div style={{ flex: 1 }}></div>
          <Space>
            <ToolbarButton
              icon={mapIcon}
              type={showMap ? "default" : "text"}
              onClick={handleTaggleMap}
            ></ToolbarButton>
            <ToolbarButton icon={<ZoomOutOutlined />}></ToolbarButton>
            <ToolbarButton icon={<ZoomInOutlined />}></ToolbarButton>
          </Space>
        </Toolbar>
        <CanvasContainer ref={canvasRef} style={{ backgroundColor: token.colorBgContainer }} >
          <Logic />
        </CanvasContainer>
        <MiniMapContainer
          ref={miniMapRef}
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
  )
})