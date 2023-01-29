import { useEffect } from "react";
import { useEditorState } from "./useEditorState";

export function useZoom() {
  const { zoom, graph } = useEditorState()

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
