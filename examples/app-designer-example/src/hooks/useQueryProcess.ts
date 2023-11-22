/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { IProcess } from "../interfaces/process"
import { allProcesses } from "../data/process"

export function useQueryProcess(id?: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [process, setProcess] = useState<IProcess>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setProcess(allProcesses.find(ps => ps.id === id))
      setLoading(false)
    }, 300)
  }, [id])

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

  return { process, loading }
}