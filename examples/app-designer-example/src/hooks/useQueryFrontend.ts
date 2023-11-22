/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { appFronts } from "../data";
import { DeviceType, IAppFrontend } from "../interfaces";
import { Entities } from "./events/entityName";
import { EVENT_DATA_CHANGED, off, on } from "./events";

export function useQueryFrontend(appId: string | undefined, device?: DeviceType) {
  const [loading, setLoading] = useState<boolean>()
  const [frontend, setFrontEnd] = useState<IAppFrontend>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setFrontEnd(appFronts.find(front => appId && front.app?.id === appId && front.deviceType === device))
      setLoading(false)
    }, 300)
  }, [device, appId])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.AppFrontend) {
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
    frontend, loading
  }
}