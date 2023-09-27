import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allFxScripts } from "../data/logic";

export function useRemoveFxScript(): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const fxScript = allFxScripts.find(fx => fx.id === id)
      if (fxScript) {
        allFxScripts.splice(allFxScripts.indexOf(fxScript), 1)
        trigger(EVENT_DATA_CHANGED, Entities.FxScript)
      }
      setLoading(false)
    }, 300)
  }, [])

  return [remove, { loading }]
}