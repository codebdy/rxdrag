import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allLogicflowExtension } from "../data/extension-logicflow";

export function useRemoveExtensionLogicFlow(
  options?: {
    onComplete?: () => void
  }
): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const flow = allLogicflowExtension.find(flow => flow.id === id)
      if (flow) {
        allLogicflowExtension.splice(allLogicflowExtension.indexOf(flow), 1)
        trigger(EVENT_DATA_CHANGED, Entities.ExtensionLogicFlow)
      }
      setLoading(false)
      options?.onComplete?.()
    }, 300)
  }, [options])

  return [remove, { loading }]
}