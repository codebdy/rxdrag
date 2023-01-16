import { Graph, Path } from "@antv/x6";
import { Button, Divider, Space } from "antd"
import { useToken } from "antd/es/theme/internal";
import { memo, useEffect, useRef, useState } from "react"
import { redoIcon, undoIcon } from "react-shells/ant5/icons";
import styled from "styled-components";
import { AlgoNode } from "./AlgoNode";
import { useAddNodes } from "./hooks/useAddNodes";
import "./style.less"
import { register } from '@antv/x6-react-shape'
import { Selection } from '@antv/x6-plugin-selection'
import { Members } from "./Members";
import { PropertyBox } from "./PropertyBox";
import { MiniMap } from "@antv/x6-plugin-minimap";
import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons";

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
  height: auto;
  width: auto;
  border: solid 1px;
  left: 16px;
  bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  .x6-widget-minimap{
    background-color: transparent;
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


register({
  shape: 'dag-node',
  width: 180,
  height: 36,
  component: AlgoNode,
  ports: {
    groups: {
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },

      },
      out: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
  },
},
)

Graph.registerEdge(
  'dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true,
)

Graph.registerConnector(
  'algo-connector',
  (s, e) => {
    const offset = 8
    const deltaX = Math.abs(e.x - s.x)
    const control = Math.floor((deltaX / 3) * 2)

    const v1 = { x: s.x + offset + control, y: s.y }
    const v2 = { x: e.x - offset - control, y: e.y }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x + offset} ${s.y}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x - offset} ${e.y}
       L ${e.x} ${e.y}
      `,
    )
  },
  true,
)
export const ReactionsEditor = memo(() => {
  const [, token] = useToken()
  const [graph, setGraph] = useState<Graph>()
  const canvasRef = useRef<HTMLDivElement>(null)
  const miniMapRef = useRef<HTMLDivElement>(null)

  useAddNodes(graph)


  useEffect(() => {
    // 画布
    const graph: Graph = new Graph({
      container: canvasRef.current!,
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },
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
            attrs: {
              line: {
                strokeDasharray: '5 5',
              },
            },
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
        width: 200,
        height: 120
      })
    );
    setGraph(graph)

    return () => {
      graph.dispose()
    }
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
            <ToolbarButton icon={<ZoomOutOutlined />}></ToolbarButton>
            <ToolbarButton icon={<ZoomInOutlined />}></ToolbarButton>
          </Space>
        </Toolbar>
        <CanvasContainer ref={canvasRef} style={{ backgroundColor: token.colorBgContainer }} >
        </CanvasContainer>
        <MiniMapContainer ref={miniMapRef} style={{ borderColor: token.colorBorder, backgroundColor: token.colorBgContainer }} />
      </CenterArea>
      <RightArea style={{ borderColor: token.colorBorder }}>
        <PropertyBox />
      </RightArea>
    </SytledContent>
  )
})