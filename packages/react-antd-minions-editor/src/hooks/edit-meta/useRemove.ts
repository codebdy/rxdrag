import { Cell } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { ActionType } from "../../actions";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";

export function useRemove() {
  const dispatch = useDispatch()
  const graph = useGraph()

  const handleRemoved = useCallback(({ cell }: { cell: Cell }) => {
    if (cell.isNode()) {
      dispatch?.({ type: ActionType.REMOVE_NODE, payload: cell.id })
    }
    if (cell.isEdge()) {
      dispatch?.({ type: ActionType.REMOVE_EDGE, payload: cell.id })
    }
  }, [dispatch])

  useEffect(() => {
    if (graph) {
      graph.on("cell:removed", handleRemoved);
      return () => {
        graph.off("cell:removed", handleRemoved)

      }
    }
  }, [graph, handleRemoved])
}