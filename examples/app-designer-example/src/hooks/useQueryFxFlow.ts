/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { IFxFlow } from "../interfaces/fx"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allFxFlows } from "../data/logic"

export function useQueryFxFlow(id: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [fxFlow, setFxFlow] = useState<IFxFlow>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setFxFlow(allFxFlows.find(fx => fx.id === id))
      setLoading(false)
    }, 300)
  }, [id])

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

  return { fxFlow, loading }
}