import { useCallback } from "react";
import { useHistoryState } from "./useHistoryState";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { IMenuSchema } from "../interfaces/schema";

export function useUndo() {
  const [menuSchema, setMuenuSchema] = useMenuSchemaState()
  const [history, setHistory] = useHistoryState()
  const undo = useCallback(() => {
    const newUndoList: IMenuSchema[] = [...history.undoList]
    const undoSnap = newUndoList.pop()
    const newRedoList = [...history.redoList, menuSchema]
    if (undoSnap) {
      setMuenuSchema(undoSnap)
    }

    setHistory({
      ...history,
      changed: true,
      undoList: newUndoList,
      redoList: newRedoList,
    })

  }, [history, menuSchema, setHistory, setMuenuSchema])

  return undo
}