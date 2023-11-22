import { useCallback } from "react";
import { useHistoryState } from "./useHistoryState";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { IMenuSchema } from "../interfaces/schema";

export function useRedo() {
  const [menuSchema, setMenuSchema] = useMenuSchemaState()
  const [history, setHistory] = useHistoryState()
  const undo = useCallback(() => {
    const newRedoList = [...history.redoList]
    const redoSnap = newRedoList.pop()
    const newUndoList: IMenuSchema[] = [...history.undoList, menuSchema]
    if (redoSnap) {
      setMenuSchema(redoSnap)
    }

    setHistory({
      ...history,
      changed: true,
      undoList: newUndoList,
      redoList: newRedoList,
    })

  }, [history, menuSchema, setHistory, setMenuSchema])

  return undo
}