/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import {  IScript } from "../interfaces/flow"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allScripts } from "../data/logic"

export function useQueryScript(id: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [script, setScript] = useState<IScript>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setScript(allScripts.find(fx => fx.id === id))
      setLoading(false)
    }, 300)
  }, [id])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.Script) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { script, loading }
}