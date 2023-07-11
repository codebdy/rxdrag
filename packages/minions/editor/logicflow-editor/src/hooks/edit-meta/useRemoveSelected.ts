import { useCallback } from "react";
import { useGraph } from "../useGraph";
import { useSelected } from "../useSelected";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { useDispatch } from "../useDispatch";

export function useRemoveSelected(){
  const graph = useGraph()
  const backup = useBackup()
  const markeChange = useMarkChange()
  const dispatch = useDispatch()
  const { selected } = useSelected()

  const handleRemove = useCallback(() => {
    if (selected) {
      backup()
      graph?.getCellById(selected)?.remove()
      markeChange()
    }

  }, [backup, graph, markeChange, selected, dispatch])

  return handleRemove
}