import { Cell } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";
import { ActionType, RemoveEdgeAction, RemoveNodeAction } from "../../actions";

export function useRemove() {
  const dispatch = useDispatch()
  const graph = useGraph()

  const handleRemoved = useCallback(({ cell }: { cell: Cell }) => {
    if (cell.isNode()) {
      const action: RemoveNodeAction = { type: ActionType.REMOVE_NODE, payload: cell.id, parentId: cell.getParentId() }
      dispatch?.(action)
    }
    if (cell.isEdge()) {
      const action: RemoveEdgeAction = { type: ActionType.REMOVE_EDGE, payload: cell.id, parentId: cell.getParentId() }
      dispatch?.(action)
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