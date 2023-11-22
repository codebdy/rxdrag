import { useEffect } from "react";
import { useGetEdgeConfig } from "./useGetEdgeConfig";
import { useGraph } from "./useGraph";
import { useMetas } from "./useMetas";
import { useShowNode } from "./useShowNode";
import { NodeType, ILineDefine } from "@rxdrag/minions-schema";
import { useShowEdge } from "./useShowEdge";
import { IActivityNode, ILogicMetas } from "../interfaces";
import { useThemeToken } from "./useThemeToken";

export function useShowCells() {
  const graph = useGraph()
  const getEdgeConfig = useGetEdgeConfig()
  const showNode = useShowNode()
  const showEdge = useShowEdge()
  const themeToken = useThemeToken()

  const { metas } = useMetas()
  useEffect(() => {
    if (graph) {
      const oldCells = graph.getCells()
      //先显示顶级节点
      for (const nodeMeta of metas?.nodes || []) {
        const node = showNode(nodeMeta)
        if (nodeMeta.type === NodeType.EmbeddedFlow) {
          node?.toBack()
          for (const childMeta of nodeMeta.children?.nodes || []) {
            const child = showNode(childMeta)
            child?.toFront()
            child && node?.addChild(child)
          }

          for (const childLine of nodeMeta.children?.lines || []) {
            showEdge(childLine)
          }
        }
      }

      for (const lineMeta of metas?.lines || []) {
        showEdge(lineMeta)
      }

      //删除不存在的
      for (const cell of oldCells) {
        if (!getAllMetas(metas).find(el => el.id === cell.id)) {
          cell.remove()
        }
      }
    }
  }, [getEdgeConfig, showEdge, showNode, graph, metas, metas?.lines, metas?.nodes, themeToken])
}

function getAllMetas(logicMetas?: ILogicMetas) {
  if (!logicMetas) {
    return []
  }
  const metas: (ILineDefine | IActivityNode)[] = [...logicMetas.lines, ...logicMetas.nodes]
  for (const nodeMeta of logicMetas.nodes) {
    if (nodeMeta.type === NodeType.EmbeddedFlow) {
      metas.push(...nodeMeta.children?.nodes || [], ...nodeMeta.children?.lines || [])
    }
  }

  return metas
}