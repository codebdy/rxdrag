/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { IFlow } from "../interfaces/flow"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allFlows } from "../data/logic"

export function useQueryFlow(id: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [flow, setFlow] = useState<IFlow>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setFlow(allFlows.find(fx => fx.id === id))
      setLoading(false)
    }, 300)
  }, [id])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.Flow) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { flow, loading }
}