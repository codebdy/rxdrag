import { Graph, NodeView, Shape } from "@antv/x6";
import { Button, Space } from "antd"
import { useToken } from "antd/es/theme/internal";
import { memo, useEffect, useRef, useState } from "react"
import { redoIcon, undoIcon } from "react-shells/ant5/icons";
import styled from "styled-components";
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
// 高亮
const magnetAvailabilityHighlighter = {
  name: 'stroke',
  args: {
    attrs: {
      fill: '#fff',
      stroke: '#47C769',
    },
  },
}

export const PipeEditor = memo(() => {
  const [, token] = useToken()
  const [graph, setGraph] = useState<Graph>()
  const canvasRef = useRef<HTMLDivElement>(null)

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
              fill: '#fff',
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

    graph.addNode(
      new MyShape().resize(120, 40).position(200, 50).updateInPorts(graph),
    )

    graph.addNode(
      new MyShape().resize(120, 40).position(400, 50).updateInPorts(graph),
    )

    graph.addNode(
      new MyShape().resize(120, 40).position(300, 250).updateInPorts(graph),
    )

    function update(view: NodeView) {
      const cell = view.cell
      if (cell instanceof MyShape) {
        cell.getInPorts().forEach((port) => {
          const portNode = view.findPortElem(port.id!, 'portBody')
          view.unhighlight(portNode, {
            highlighter: magnetAvailabilityHighlighter,
          })
        })
        cell.updateInPorts(graph)
      }
    }

    graph.on('edge:connected', ({ previousView, currentView }) => {
      if (previousView) {
        update(previousView as NodeView)
      }
      if (currentView) {
        update(currentView as NodeView)
      }
    })

    graph.on('edge:removed', ({ edge, options }) => {
      if (!options.ui) {
        return
      }

      const target = edge.getTargetCell()
      if (target instanceof MyShape) {
        target.updateInPorts(graph)
      }
    })

    graph.on('edge:mouseenter', ({ edge }) => {
      edge.addTools([
        'source-arrowhead',
        'target-arrowhead',
        {
          name: 'button-remove',
          args: {
            distance: -30,
          },
        },
      ])
    })

    graph.on('edge:mouseleave', ({ edge }) => {
      edge.removeTools()
    })
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