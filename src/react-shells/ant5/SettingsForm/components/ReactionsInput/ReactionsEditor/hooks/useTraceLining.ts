import { Edge } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useGlobalState } from "./useGlobalState";

export function useTraceLining() {
  const { setLining, graph } = useGlobalState()

  const handleEdgeAdded = useCallback(({ edge }: { edge: Edge }) => {
    if((edge.target as any)?.x && (edge.target as any)?.y){
      setLining?.(true)
    }
  }, [setLining])

  const hadleMouseUp = useCallback(() => {
    setLining?.(false)
  }, [setLining])

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