import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useNodeChanged() {
  const [flag, setFlag] = useState<number>(0)
  const designer = useDesignerEngine()


  const handleNodeChange = useCallback(() => {
    setFlag(flag => flag + 1)
  }, [])

  useEffect(() => {
    const unscibeNode = designer?.getMonitor().subscribeToNodeChanged(handleNodeChange)
    return () => {
      unscibeNode?.()
    }
  }, [designer, handleNodeChange])

  return flag
}