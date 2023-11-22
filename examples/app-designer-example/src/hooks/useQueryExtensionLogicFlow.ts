/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { IExtensionLogicFlow } from "../interfaces/extension"
import { allLogicflowExtension } from "../data/extension-logicflow"

export function useQueryExtensionLogicFlow(id: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [flow, setFlow] = useState<IExtensionLogicFlow>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setFlow(allLogicflowExtension.find(flow => flow?.id === id))
      setLoading(false)
    }, 300)
  }, [id])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.ExtensionLogicFlow) {
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