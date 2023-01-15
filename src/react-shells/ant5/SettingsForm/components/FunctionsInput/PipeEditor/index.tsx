import { Graph, Shape } from "@antv/x6";
import { Button, Space } from "antd"
import { useToken } from "antd/es/theme/internal";
import { memo, useEffect, useRef, useState } from "react"
import { redoIcon, undoIcon } from "react-shells/ant5/icons";
import styled from "styled-components";
import { useAddNodes } from "./hooks/useAddNodes";
import { magnetAvailabilityHighlighter } from "./hooks/useEvents";
import { MyShape } from "./MyShape";

const SytledContent = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  border: solid 1px;
`

const LeftArea = styled.div`
  width: 220px;
  border-right: solid 1px;
  padding: 8px;
`

const CenterArea = styled.div`
  flex:1;
  display: flex;
  flex-flow: column;
`

const Toolbar = styled.div`
  display: flex;
  padding: 0 8px;
  height: 40px;
  align-items: center;
  border-bottom: solid 1px;
`

const CanvasContainer = styled.div`
  flex: 1
`

const PropertyBox = styled.div`
  width: 220px;
  border-left: solid 1px;
  padding: 8px;
`

export const PipeEditor = memo(() => {
  const [, token] = useToken()
  const [graph, setGraph] = useState<Graph>()
  const canvasRef = useRef<HTMLDivElement>(null)

  useAddNodes(graph)


  useEffect(() => {
    // 画布
    const graph = new Graph({
      container: canvasRef.current!,
      highlighting: {
        magnetAvailable: magnetAvailabilityHighlighter,
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#transparent',
              stroke: '#31d0c6',
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'er',
          args: {
            direction: 'V',
          },
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 7,
                },
              },
            },
          })
        },
        validateConnection({ sourceView, targetView, targetMagnet }) {
          if (!targetMagnet) {
            return false
          }

          if (targetMagnet.getAttribute('port-group') !== 'in') {
            return false
          }

          if (targetView) {
            const node = targetView.cell
            if (node instanceof MyShape) {
              const portId = targetMagnet.getAttribute('port')
              const usedInPorts = node.getUsedInPorts(graph)
              if (usedInPorts.find((port) => port && port.id === portId)) {
                return false
              }
            }
          }

          return true
        },
      },
    })
    setGraph(graph)

    return ()=>{
      graph.dispose()
    }
  }, [])

  return (
    <SytledContent style={{ borderColor: token.colorBorder }}>
      <LeftArea style={{ borderColor: token.colorBorder }}>
        left
      </LeftArea>
      <CenterArea>
        <Toolbar style={{ borderColor: token.colorBorder }}>
          <Space>
            <Button shape="circle" type="text" icon={undoIcon}></Button>
            <Button shape="circle" disabled type="text" icon={redoIcon}></Button>
          </Space>
        </Toolbar>
        <CanvasContainer ref={canvasRef} style={{ backgroundColor: token.colorBgContainer }} >

        </CanvasContainer>
      </CenterArea>
      <PropertyBox style={{ borderColor: token.colorBorder }}>
        right
      </PropertyBox>
    </SytledContent>
  )
})