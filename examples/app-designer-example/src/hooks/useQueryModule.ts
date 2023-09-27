/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { defaultModules } from "../data/mudules";
import { DeviceType } from "../interfaces";
import { IModule } from "../interfaces/module";
import { Entities } from "./events/entityName";
import { EVENT_DATA_CHANGED, off, on } from "./events";

export function useQueryModule(device: DeviceType | undefined, moduleId: string) {
  const [loading, setLoading] = useState<boolean>()
  const [module, setModule] = useState<IModule>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setModule(!device ? undefined : defaultModules[device]?.find(mod => mod.id === moduleId))
      setLoading(false)
    }, 300)
  }, [device, moduleId])

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

  return { module, loading, }
}