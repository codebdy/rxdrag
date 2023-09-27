/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { FxScope, IFxFlow } from "../interfaces/fx"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allFxFlows } from "../data/logic"

export function useQueryFxFlows(scope: FxScope, ownerId?: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [fxFlows, setFxFlows] = useState<IFxFlow[]>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setFxFlows(allFxFlows.filter(fx => fx.ownerId === ownerId && fx.scope === scope))
      setLoading(false)
    }, 300)
  }, [ownerId, scope])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.FxFlow) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { fxFlows, loading }
}