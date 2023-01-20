import { CellView, Graph } from "@antv/x6";
import { useEffect, useState } from "react";
import { config } from "./config";
import { Selection } from '@antv/x6-plugin-selection'
import { MiniMap } from "@antv/x6-plugin-minimap";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { useToken } from "antd/es/theme/internal";

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

export function useCreateGraph() {
  const [graph, setGraph] = useState<Graph>()
  const [, token] = useToken()
  useEffect(() => {
    // 画布
    const gph: Graph = new Graph({
      container: document.getElementById("reactions-canvas-container")!,
      ...config,
      interacting: (cellView: CellView) => {
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
        highlight: true,
        connector: 'reactions-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet(args) {
          const { magnet, cell } = args
          return magnet.getAttribute('port-group') !== 'in' && cell?.getData()?.type !== ReactionType.End
        },
        validateConnection(args) {
          const { targetMagnet, targetCell } = args
          return targetMagnet?.getAttribute('port-group') !== 'out' && targetCell?.getData()?.type !== ReactionType.Start
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
      rubberband: false,
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
  }, [token.colorPrimary])

  return graph
}