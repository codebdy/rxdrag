import { useEffect } from "react";
import { useGraph } from "./useGraph";
import { useZoom } from "./useZoom";

export function useSetZoom() {
  const graph = useGraph()
  const { zoom } = useZoom()

  useEffect(() => {
    if (graph) {
      if (zoom === 0) {
        graph.zoomToFit();
        graph.center();
      } else {
        graph.zoomTo(zoom);
      }
    }
  }, [graph, zoom]);
}