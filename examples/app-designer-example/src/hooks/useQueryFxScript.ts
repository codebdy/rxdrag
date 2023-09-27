/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import {  IFxScript } from "../interfaces/fx"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allFxScripts } from "../data/logic"

export function useQueryFxScript(id: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [fxScript, setFxScript] = useState<IFxScript>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setFxScript(allFxScripts.find(fx => fx.id === id))
      setLoading(false)
    }, 300)
  }, [id])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.FxScript) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { fxScript, loading }
}