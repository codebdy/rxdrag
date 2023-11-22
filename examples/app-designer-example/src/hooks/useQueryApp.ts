/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { defaultApp } from "../data";
import { IApp } from "../interfaces";
import { on, EVENT_DATA_CHANGED, off } from "./events";
import { Entities } from "./events/entityName";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useQueryApp(id?: string): {
  app?: IApp,
  loading?: boolean,
} {
  const [loading, setLoading] = useState<boolean>()
  const [app, setApp] = useState<IApp>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setApp({ ...defaultApp })
      setLoading(false)
    }, 300)
  }, [])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.App) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return {
    app,
    loading,
  }
}