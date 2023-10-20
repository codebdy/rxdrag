import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allProcesses } from "../data/process";

export function useRemoveProcess(
  options?: {
    onComplete?: () => void
  }
): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const script = allProcesses.find(process => process.id === id)
      if (script) {
        allProcesses.splice(allProcesses.indexOf(script), 1)
        trigger(EVENT_DATA_CHANGED, Entities.Process)
      }
      setLoading(false)
      options?.onComplete?.()
    }, 300)
  }, [options])

  return [remove, { loading }]
}