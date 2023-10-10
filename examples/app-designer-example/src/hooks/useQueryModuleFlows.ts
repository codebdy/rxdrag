/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { IFlow, LogicType } from "../interfaces/flow"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allFlows } from "../data/logic"

export function useQueryModuleFlows(moduleId: ID | undefined) {
  const [loading, setLoading] = useState<boolean>()
  const [flows, sefFlows] = useState<IFlow[]>()

  const fillData = useCallback(() => {
    if(!moduleId){
      return
    }
    setLoading(true)
    setTimeout(() => {
      sefFlows(allFlows.filter(fl => fl.moduleId === moduleId && fl.type === LogicType.normal))
      setLoading(false)
    }, 300)
  }, [moduleId])

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

  return { flows, loading }
}