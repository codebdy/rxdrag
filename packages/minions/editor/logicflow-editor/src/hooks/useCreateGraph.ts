/* eslint-disable @typescript-eslint/no-explicit-any */
import { Graph } from "@antv/x6";
import { useEffect, useState } from "react";
import { config } from "./config";
import { Selection } from '@antv/x6-plugin-selection'
import { MiniMap } from "@antv/x6-plugin-minimap";
import { IActivityNode, INodeData } from "../interfaces/interfaces";
import { IThemeToken } from "../interfaces";
import { ActivityType } from "@rxdrag/minions-schema";

const magnetAvailabilityHighlighter = {
  name: "stroke",
  args: {
    padding: 3,
    attrs: {
      strokeWidth: 2,
      stroke: "#52c41a",
    },
  },
};

export function useCreateGraph(token: IThemeToken) {
  const [graph, setGraph] = useState<Graph>()

  useEffect(() => {
    // 画布
    const gph: Graph = new Graph({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: document.getElementById("reactions-canvas-container")!,
      ...config,
      //子节点处理
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox()
          const data = node.getData<{ meta: IActivityNode }>()
          //不能递归嵌套
          if(data.meta.type === ActivityType.EmbeddedFlow){
            return []
          }

          return this.getNodes().filter((node) => {
            const data = node.getData<{ meta: IActivityNode }>()
            if (data && data.meta.type === ActivityType.EmbeddedFlow) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        },
      },
      //限制嵌套节点的移动
      // translating: {
      //   restrict(view) {
      //     if (view) {
      //       const cell = view.cell
      //       if (cell.isNode()) {
      //         const parent = cell.getParent()
      //         if (parent) {
      //           return parent.getBBox()
      //         }
      //       }
      //     }
      //     return null
      //   },
      // },
      interacting: () => {
        return { nodeMovable: true, edgeLabelMovable: false };
      },
      highlighting: {
        magnetAvailable: magnetAvailabilityHighlighter,
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              stroke: token.colorPrimary,
              strokeWidth: 4,
            },
          },
        },
      },

      connecting: {
        //自动吸附
        snap: {
          radius: 12,
        },
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        allowEdge: false,
        allowMulti: true,
        highlight: true,
        connector: 'reactions-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet(args) {
          const { magnet, cell } = args
          return magnet.getAttribute('port-group') !== 'in' && cell?.getData<INodeData>()?.meta?.type !== ActivityType.End
        },
        validateConnection(args) {
          const { targetMagnet, targetCell, sourceCell, sourceMagnet } = args
          let isConnected = false;
          const edges = gph?.getEdges() || [];
          const targetId = targetCell?.id;
          const sourceId = sourceCell?.id;
          const targetPort = targetMagnet?.parentElement?.getAttribute('port');
          const sourcePort = sourceMagnet?.parentElement?.getAttribute('port') || undefined;
          for (const edge of edges) {
            if (targetId && targetPort && (edge.target as any).cell === targetId && (edge.target as any).port === targetPort) {
              isConnected = true
              break
            }
            //连接到结束点
            if (!targetPort && targetId) {
              if (targetId === (edge.target as any).cell
                && sourceId === (edge.source as any).cell
                && (edge.source as any).port === sourcePort) {
                isConnected = true
                break
              }
            }
          }

          return !isConnected &&
            targetMagnet?.parentElement?.getAttribute('port-group') !== 'out' &&
            targetCell?.getData<INodeData>()?.meta?.type !== ActivityType.Start
        },
        createEdge() {
          return gph?.createEdge({
            shape: 'reaction-edge',
            zIndex: -1,
            attrs: {
              line: {
                stroke: token.colorTextSecondary,
                strokeWidth: 1,
                targetMarker: null,
              },
            },
          })
        },
      },
    })
    gph.use(new Selection({
      enabled: true,
      multiple: false,
      rubberband: false,
      movable: true,
      //showNodeSelectionBox: true,
    }))

    gph.use(
      new MiniMap({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        container: document.getElementById("reactions-minimap-container")!,
        width: 200,
        height: 160,
        padding: 10,
      })
    );

    setGraph(gph)

    return () => {
      gph?.dispose()
    }
  }, [token.colorPrimary, token.colorTextSecondary])

  return graph
}