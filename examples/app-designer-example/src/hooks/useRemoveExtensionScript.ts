import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allScriptExtensions } from "../data/extension-script";

export function useRemoveExtensionScript(
  options?: {
    onComplete?: () => void
  }
): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const script = allScriptExtensions.find(script => script.id === id)
      if (script) {
        allScriptExtensions.splice(allScriptExtensions.indexOf(script), 1)
        trigger(EVENT_DATA_CHANGED, Entities.ExtensionScript)
      }
      setLoading(false)
      options?.onComplete?.()
    }, 300)
  }, [options])

  return [remove, { loading }]
}