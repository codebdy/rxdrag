import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allFxFlows } from "../data/logic";

export function useRemoveFxFlow(): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const fxFlow = allFxFlows.find(fx => fx.id === id)
      if (fxFlow) {
        allFxFlows.splice(allFxFlows.indexOf(fxFlow), 1)
        trigger(EVENT_DATA_CHANGED, Entities.FxFlow)
      }
      setLoading(false)
    }, 300)
  }, [])

  return [remove, { loading }]
}