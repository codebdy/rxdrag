import { ID } from "@rxdrag/core"
import { useCallback, useEffect, useState } from "react"
import { useDesignerEngine } from "./useDesignerEngine"

export function useSelectedNodeIds(documentId?: ID) {
  const [ids, setIds] = useState<ID[] | null | undefined>(null)
  const designer = useDesignerEngine()

  useEffect(() => {
    setIds(designer?.getMonitor().getDocumentSelectedIds(documentId || ""))
  }, [designer, documentId])

  const handleCurrentChange = useCallback(() => {
    setIds(designer?.getMonitor().getDocumentSelectedIds(documentId || ""))
  }, [designer, documentId])
  
  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToSelectChange(handleCurrentChange)

    return () => {
      unscribe?.()
    }
  }, [designer, handleCurrentChange])

  return ids
}