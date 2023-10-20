/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { IExtendsionScript } from "../interfaces/extension"
import { allScriptExtensions } from "../data/extension-script"

export function useQueryAppExtensionScripts(appId: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [scripts, setScripts] = useState<IExtendsionScript[]>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setScripts(allScriptExtensions.filter(script => script?.belongsTo?.id === appId))
      setLoading(false)
    }, 300)
  }, [appId])

  useEffect(() => {
    fillData()
  }, [fillData])

  const handleDataEvent = useCallback((event: CustomEvent) => {
    if (event.detail === Entities.ExtensionScript) {
      fillData()
    }
  }, [fillData])

  useEffect(() => {
    on(EVENT_DATA_CHANGED, handleDataEvent as any);
    return () => {
      off(EVENT_DATA_CHANGED, handleDataEvent as any);
    }
  }, [handleDataEvent])

  return { scripts, loading }
}