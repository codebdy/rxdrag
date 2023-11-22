/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { allProcessCategories } from "../data/process"
import { IProcessCategory } from "../interfaces/process"

export function useQueryAppProcessCategories(appId: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [categories, setCategories] = useState<IProcessCategory[]>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setCategories(allProcessCategories.filter(category => category?.app?.id === appId))
      setLoading(false)
    }, 300)
  }, [appId])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.ProcessCategory) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { categories, loading }
}