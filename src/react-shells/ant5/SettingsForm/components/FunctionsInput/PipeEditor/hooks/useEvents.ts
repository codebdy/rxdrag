import { Graph, NodeView } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { MyShape } from "../MyShape";

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
  const update = useCallback((view: NodeView) => {
    const cell = view.cell
    if (cell instanceof MyShape && graph) {
      cell.getInPorts().forEach((port) => {
        const portNode = view.findPortElem(port.id!, 'portBody')
        view.unhighlight(portNode, {
          highlighter: magnetAvailabilityHighlighter,
        })
      })
      cell.updateInPorts(graph)
    }
  }, [graph])
  
  useEffect(() => {
    if (graph) {
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
    }

  }, [graph, update])
}