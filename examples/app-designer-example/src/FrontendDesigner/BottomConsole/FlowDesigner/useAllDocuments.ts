import { IDocument } from "@rxdrag/core";
import { useDesignerEngine } from "@rxdrag/react-core";
import { useCallback, useEffect, useState } from "react";

export function useAllDocuments() {
  const [docs, setDocs] = useState<IDocument[]>()
  const engine = useDesignerEngine()

  const updateDocs = useCallback(() => {
    setDocs(engine?.getAllDocuments() || undefined)
  }, [engine])

  useEffect(() => {
    updateDocs()
  }, [engine, updateDocs])

  useEffect(() => {
    const unsub = engine?.getMonitor().subscribeToHasNodeChanged(updateDocs)
    const unsubDocsChange = engine?.getMonitor().subscribeToDocumentsChange(updateDocs)
    return () => {
      unsub?.()
      unsubDocsChange?.()
    }
  }, [engine, updateDocs])

  return docs
}