/* eslint-disable @typescript-eslint/no-explicit-any */
import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { config } from "./config";
import { Selection } from '@antv/x6-plugin-selection'
import { MiniMap } from "@antv/x6-plugin-minimap";
import { IActivityNode, INodeData } from "../interfaces/interfaces";
import { IThemeToken } from "../interfaces";
import { NodeType } from "@rxdrag/minions-schema";
import { useGetNodeMeta } from "./useGetNodeMeta";
import { EditorStore } from "../classes";
import { useGraphState } from "./useGraphState";

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
let inter: any;
export function useCreateGraph(token: IThemeToken, store?: EditorStore) {
  const [, setGraph] = useGraphState()
  const getNodeMeta = useGetNodeMeta(store)
  const getNodeMetaRef = useRef(getNodeMeta)
  getNodeMetaRef.current = getNodeMeta

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
          if (data.meta.type === NodeType.EmbeddedFlow) {
            return []
          }

          //开始、结束节点不需要嵌入
          if (data.meta.type === NodeType.Start || data.meta.type === NodeType.End) {
            return []
          }

          return this.getNodes().filter((node) => {
            const data = node.getData<{ meta: IActivityNode }>()
            if (data && data.meta.type === NodeType.EmbeddedFlow) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        },
      },
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
        allowLoop: true,
        allowNode: false,
        allowEdge: false,
        allowMulti: true,
        highlight: true,
        connector: 'reactions-connector',
        connectionPoint: 'boundary',
        anchor: 'center',
        //判断能否往外拉线
        validateMagnet(args) {
          const { magnet, cell } = args
          const portElement = magnet?.parentElement
          const { meta } = cell.getData<{ meta: IActivityNode | undefined }>()
          //子流程容器的端口是可以往外拉线的
          if (meta?.type === NodeType.EmbeddedFlow) {
            return true
          }
          return portElement?.getAttribute('port-group') !== 'in' && cell?.getData<INodeData>()?.meta?.type !== NodeType.End
        },

        //判断能否连接目标端口
        validateConnection(args) {
          const { targetMagnet, targetCell, sourceCell, sourceMagnet } = args
          let isConnected = false;
          const edges = gph?.getEdges() || [];
          const targetId = targetCell?.id;
          const sourceId = sourceCell?.id;

          const targetPort = targetMagnet?.parentElement?.getAttribute('port');
          const sourcePort = sourceMagnet?.getAttribute('port') || undefined;

          for (const edge of edges) {
            //同一个节点端口已经有了连接
            // if (targetId && targetPort &&
            //   (edge.target as any).cell === targetId && (edge.target as any).port === targetPort &&
            //   (edge.source as any).cell === sourceId && (edge.source as any).port === sourcePort) {
            //   isConnected = true
            //   break
            // }
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
          //数据从sourceCell取，有个延时，新建节点时，拿不到parentId
          const sourceMeta = getNodeMetaRef.current(sourceId || "")
          //数据从targetCell取，有个延时，新建节点时，拿不到parentId
          const targetMeta = getNodeMetaRef.current(targetId || "")

          //起点是嵌入容器的端口
          if (sourceMeta?.type === NodeType.EmbeddedFlow) {
            //是嵌入容器的input
            if (sourceMeta.inPorts?.find(port => port.id === sourcePort)) {
              //如果目标节点是本节点的output
              if (sourceMeta.id === targetMeta?.id) {
                if (sourceMeta.outPorts?.find(port => port.id === targetPort)) {
                  return true
                }
              }
              //如果目标节点不在容器内
              if (targetMeta?.parentId !== sourceMeta.id) {
                return false;
              }
              //是嵌入容器的output
            } else {
              //如果是连自身节点
              if (sourceMeta.id === targetMeta?.id) {
                return false
              }

              //如果目标节点在容器内，或者在其它容器内
              if (targetMeta?.parentId) {
                return false;
              }
            }
            //起始节点在容器内
          } else if (sourceMeta?.parentId) {
            //如果目标节点是容器的output
            if (targetMeta?.id === sourceMeta?.parentId) {
              if (targetMeta.outPorts?.find(port => port.id === targetPort)) {
                return true
              }
            }
            if (targetMeta?.parentId !== sourceMeta?.parentId) {
              return false
            }
            //起始节点在容器外
          } else {
            if (targetMeta?.parentId) {
              return false
            }
          }

          //其它连接自身的情况
          if (targetMeta?.id === sourceMeta?.id) {
            return false
          }

          return !isConnected &&
            targetMagnet?.parentElement?.getAttribute('port-group') !== 'out' &&
            targetCell?.getData<INodeData>()?.meta?.type !== NodeType.Start
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
    // 修复在部分浏览器上， dom还没挂载，导致小地图报错
    clearTimeout(inter);
    inter = setTimeout(() => {
      gph.use(
        new MiniMap({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          container: document.getElementById("reactions-minimap-container")!,
          width: 200,
          height: 160,
          padding: 10,
        })
      );
    }, 100)

    setGraph(gph)

    return () => {
      clearTimeout(inter);
      gph?.dispose()
    }
  }, [setGraph, token.colorPrimary, token.colorTextSecondary])

}