import { useCallback, useMemo } from "react";
import { useActivedDocument } from "./useActivedDocument";
import { useSnapshots } from "./useSnapshots";

export function useRedo(): [boolean, () => void] {
  const { snapshotIndex, history } = useSnapshots()
  const document = useActivedDocument()
  const can = useMemo(() => {
    if (!document) {
      return false
    }
    if (snapshotIndex === null) {
      return false
    }

    if (snapshotIndex < history.length - 1) {
      return true
    }

    return false
  }, [document, history.length, snapshotIndex])

  const redo = useCallback(() => {
    document?.redo()
  }, [document])

  return [can, redo]
}