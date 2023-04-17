import { ISnapshot } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useMonitor } from "./useMonitor";

export function useSnapshots() {
  const [snapshotIndex, setSnapshotIndex] = useState<number>(0)
  const [history, setHistory] = useState<ISnapshot[]>([])
  const [activedDocumentId] = useActivedDocumentIdState()
  const moniter = useMonitor()

  useEffect(() => {
    if (activedDocumentId) {
      const doc = moniter?.getState()?.documentsById[activedDocumentId]
      if (doc) {
        setHistory(doc.history)
        setSnapshotIndex(doc.snapshotIndex)
      }

    }
  }, [activedDocumentId, moniter])

  const handleSanpshotIndexChange = useCallback((index: number) => {
    setSnapshotIndex(index)
  }, [])

  const handleHistoryChange = useCallback((history: ISnapshot[]) => {
    setHistory(history)
  }, [])

  useEffect(() => {
    const historyUnsub = moniter?.subscribeToHistoryChange(activedDocumentId || "", handleHistoryChange)
    const ndexUnsub = moniter?.subscribeToSnapshotIndexChange(activedDocumentId || "", handleSanpshotIndexChange)

    return () => {
      historyUnsub?.()
      ndexUnsub?.()
    }
  }, [activedDocumentId, handleHistoryChange, handleSanpshotIndexChange, moniter])

  return { snapshotIndex, history }
}