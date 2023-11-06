import { useCallback, useMemo } from "react";
import { useActivedDocument } from "./useActivedDocument";
import { useSnapshots } from "./useSnapshots";

export function useUndo(): [boolean, () => void] {
  const { snapshotIndex, history } = useSnapshots()
  const document = useActivedDocument()
  const can = useMemo(() => {
    if (!document) {
      return false
    }
    if (snapshotIndex === null) {
      if (history.length > 1) {
        return true
      }
      return false
    }

    if (snapshotIndex > 0) {
      return true
    }

    return false
  }, [document, history.length, snapshotIndex])

  const undo = useCallback(() => {
    document?.undo()
  }, [document])

  return [can, undo]
}