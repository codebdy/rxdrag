import { Edge } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useEditorState } from "./useEditorState";

export function useTraceLining() {
  const { dispatch, graph } = useEditorState()

  const handleEdgeAdded = useCallback(({ edge }: { edge: Edge }) => {
    if ((edge.target as any)?.x && (edge.target as any)?.y) {
      dispatch({ type: 'START_LINE' })
    }
  }, [dispatch])

  const hadleMouseUp = useCallback(() => {
    dispatch({ type: 'END_LINE' })
  }, [dispatch])

  useEffect(() => {
    if (graph) {
      graph.on("edge:added", handleEdgeAdded);
      document.addEventListener("mouseup", hadleMouseUp)
      return () => {
        graph.off("edge:added", handleEdgeAdded)
        document.removeEventListener("mouseup", hadleMouseUp)
      }
    }
  }, [graph, hadleMouseUp, handleEdgeAdded])
}