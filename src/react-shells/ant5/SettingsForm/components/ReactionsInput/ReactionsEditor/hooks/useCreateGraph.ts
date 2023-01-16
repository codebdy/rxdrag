import { Graph } from "@antv/x6";
import { useEffect, useMemo } from "react";
import { config } from "./config";
import { Selection } from '@antv/x6-plugin-selection'
import { MiniMap } from "@antv/x6-plugin-minimap";

export function useCreateGraph(canvasEl: HTMLDivElement | null, mapEl: HTMLDivElement | null) {
  const graph: Graph | undefined = useMemo(() => {
    if (canvasEl && mapEl) {
      // 画布
      return new Graph({
        container: canvasEl!,
        ...config,
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
            return graph?.createEdge({
              shape: 'dag-edge',
              zIndex: -1,
            })
          },
        },
      })
    }
    return undefined

  }, [canvasEl, mapEl])

  useEffect(() => {
    graph?.use(new Selection({
      enabled: true,
      multiple: true,
      rubberEdge: true,
      rubberNode: true,
      modifiers: 'shift',
      rubberband: true,
    }))
    graph?.use(
      new MiniMap({
        container: mapEl || undefined,
        width: 180,
        height: 80
      })
    );

    return () => {
      graph?.dispose()
    }
  }, [graph, mapEl])

  return graph
}