/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { IMeta } from "../interfaces/meta"
import { allMetas } from "../data/meta"

export function useQueryAppMeta(appId: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [meta, setMeta] = useState<IMeta>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setMeta(allMetas.find(meta => meta.app?.id === appId))
      setLoading(false)
    }, 300)
  }, [appId])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.Meta) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { meta, loading }
}