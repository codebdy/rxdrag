import { Graph, NodeView } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { NodeStatus } from "../components/ReactionNode";

// 高亮
export const magnetAvailabilityHighlighter = {
  name: 'stroke',
  args: {
    attrs: {
      fill: 'transparent',
      stroke: '#47C769',
    },
  },
}


export function useEvents(graph?: Graph) {

  
  useEffect(() => {
    if (graph) {
      graph.on('edge:connected', ({ edge }) => {
        edge.attr({
          line: {
            strokeDasharray: '',
          },
        })
      })
      
      graph.on('node:change:data', ({ node }) => {
        const edges = graph.getIncomingEdges(node)
        const { status } = node.getData() as NodeStatus
        edges?.forEach((edge) => {
          if (status === 'running') {
            edge.attr('line/strokeDasharray', 5)
            edge.attr('line/style/animation', 'running-line 30s infinite linear')
          } else {
            edge.attr('line/strokeDasharray', '')
            edge.attr('line/style/animation', '')
          }
        })
      })
      
    }

  }, [graph])
}