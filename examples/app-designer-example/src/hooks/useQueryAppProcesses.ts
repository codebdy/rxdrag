/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allProcesses } from "../data/process"
import { IProcess } from "../interfaces/process"

export function useQueryAppProcesses(appId: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [processes, setProcesses] = useState<IProcess[]>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setProcesses(allProcesses.filter(process => process?.app?.id === appId))
      setLoading(false)
    }, 300)
  }, [appId])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.Process) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { processes, loading }
}