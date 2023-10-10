/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { FxScope, IFlow, LogicType } from "../interfaces/flow"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allFlows } from "../data/logic"

export function useQueryFlows(ownerId: ID | undefined, type: LogicType, scope?: FxScope) {
  const [finished, setFinished] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>()
  const [flows, sefFlows] = useState<IFlow[]>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      sefFlows(ownerId ? allFlows.filter(fl => fl.ownerId === ownerId && fl.scope === scope && fl.type === type) : undefined)
      setLoading(false)
      setFinished(true)
    }, 300)
  }, [ownerId, scope, type])

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

  return { flows, loading, finished }
}