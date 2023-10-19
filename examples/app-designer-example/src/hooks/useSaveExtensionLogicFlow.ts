import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IExtensionLogicFlow } from "../interfaces/extension";
import { allLogicflowExtension } from "../data/extension-logicflow";

export function useSaveExtensionLogicFlow(options?: {
  onComplete?: () => void
}): [(flow: IExtensionLogicFlow) => void, { loading?: boolean, flow?: IExtensionLogicFlow }] {
  const [flow, setFlow] = useState<IExtensionLogicFlow>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((flow: IExtensionLogicFlow) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allLogicflowExtension.length; i++) {
        if (allLogicflowExtension[i].id === flow.id) {
          allLogicflowExtension[i] = { ...allLogicflowExtension[i], ...flow }
          edit = true
          break
        }
      }

      if(!edit){
        allLogicflowExtension.push(flow)
      }

      trigger(EVENT_DATA_CHANGED, Entities.ExtensionLogicFlow)
      setLoading(false)
      setFlow(flow)
      console.log("===>allLogicflowExtension", allLogicflowExtension)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { flow: flow, loading }]
}