import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allFlows } from "../data/logic";

export function useRemoveFlow(
  options?: {
    onComplete?: () => void
  }
): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const flow = allFlows.find(fx => fx.id === id)
      if (flow) {
        allFlows.splice(allFlows.indexOf(flow), 1)
        trigger(EVENT_DATA_CHANGED, Entities.Flow)
      }
      setLoading(false)
      options?.onComplete?.()
    }, 300)
  }, [options])

  return [remove, { loading }]
}