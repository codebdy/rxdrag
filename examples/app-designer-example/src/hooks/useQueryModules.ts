/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { defaultModules } from "../data/mudules";
import { DeviceType } from "../interfaces";
import { IModule } from "../interfaces/module";
import { on, EVENT_DATA_CHANGED, off } from "./events";
import { Entities } from "./events/entityName";

export function useQueryModules(device: DeviceType | undefined) {
  const [loading, setLoading] = useState<boolean>()
  const [modules, setModules] = useState<IModule[]>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setModules(!device ? undefined : defaultModules[device])
      setLoading(false)
    }, 300)
  }, [device])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.Module) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { modules, loading }
}