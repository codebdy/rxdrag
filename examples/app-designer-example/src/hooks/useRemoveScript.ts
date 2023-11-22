import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allScripts } from "../data/logic";

export function useRemoveScript(
  options?: {
    onComplete?: () => void
  }
): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const script = allScripts.find(fx => fx.id === id)
      if (script) {
        allScripts.splice(allScripts.indexOf(script), 1)
        trigger(EVENT_DATA_CHANGED, Entities.Script)
      }
      setLoading(false)
      options?.onComplete?.()
    }, 300)
  }, [options])

  return [remove, { loading }]
}