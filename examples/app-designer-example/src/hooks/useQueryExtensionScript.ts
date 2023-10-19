/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import { on, EVENT_DATA_CHANGED, off } from "./events"
import { Entities } from "./events/entityName"
import { ID } from "@rxdrag/shared"
import { IExtendsionScript } from "../interfaces/extension"
import { allScriptExtensions } from "../data/extension-script"

export function useQueryExtensionScript(id?: ID) {
  const [loading, setLoading] = useState<boolean>()
  const [script, setScript] = useState<IExtendsionScript>()

  const fillData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setScript(allScriptExtensions.find(script => script?.id === id))
      setLoading(false)
    }, 300)
  }, [id])

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

  return { script, loading }
}