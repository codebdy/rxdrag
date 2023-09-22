import { useCallback } from "react";
import { IMenuSchema } from "../interfaces/schema";
import { useHistoryState } from "./useHistoryState";

export function useBackup() {
  const [, setHistory] = useHistoryState()
  const backup = useCallback((schema: IMenuSchema) => {
    setHistory(history => ({
      changed: true,
      undoList: [...history.undoList, schema],
      redoList: []
    }))
  }, [setHistory])

  return backup
}