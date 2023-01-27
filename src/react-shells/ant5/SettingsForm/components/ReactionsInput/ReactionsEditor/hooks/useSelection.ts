import { Cell } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { ActionType } from "../actions";
import { useEditorState } from "./useEditorState";

export function useSelection() {
  const { graph, dispatch } = useEditorState()

  const handleSelected = useCallback(({ cell }: { cell: Cell }) => {
    if (!graph?.getCellById(cell.id)) {
      graph?.cleanSelection()
      dispatch({ type: ActionType.SELECTION, payload: undefined })
    } else {
      dispatch({ type: ActionType.SELECTION, payload: cell.id })
    }
  }, [dispatch, graph])

  const handleUnSelected = useCallback(({ cell }: { cell: Cell }) => {
    dispatch({ type: ActionType.SELECTION, payload: undefined })
  }, [dispatch])

  useEffect(() => {
    graph?.on("cell:selected", handleSelected)
    graph?.on("cell:unselected", handleUnSelected)
    return () => {
      graph?.off("cell:selected", handleSelected)
      graph?.off("cell:unselected", handleUnSelected)
    }
  }, [graph, handleSelected, handleUnSelected])
}