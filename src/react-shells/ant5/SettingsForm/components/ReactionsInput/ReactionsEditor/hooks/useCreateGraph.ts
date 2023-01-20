import { CellView, Graph } from "@antv/x6";
import { useEffect, useState } from "react";
import { config } from "./config";
import { Selection } from '@antv/x6-plugin-selection'
import { MiniMap } from "@antv/x6-plugin-minimap";

export function useCreateGraph() {
  const [graph, setGraph] = useState<Graph>()
  useEffect(() => {
    // 画布
    const gph: Graph = new Graph({
      container: document.getElementById("reactions-canvas-container")!,
      ...config,
      interacting: (cellView: CellView) => {
        return { nodeMovable: true, edgeLabelMovable: false };
      },
      connecting: {
        //自动吸附
        snap: {
          radius: 12,
        },
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        allowEdge: true,
        highlight: true,
        connector: 'reactions-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet({ magnet }) {
          return magnet.getAttribute('port-group') !== 'top'
        },
        createEdge() {
          return gph?.createEdge({
            shape: 'reaction-edge',
            zIndex: -1,
          })
        },
      },
    })
    gph.use(new Selection({
      enabled: true,
      multiple: false,
      rubberband: true,
      movable: true,
      //showNodeSelectionBox: true,
    }))

    gph.use(
      new MiniMap({
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
  }, [])

  return graph
}