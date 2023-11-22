import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IFlow } from "../interfaces/flow";
import { allFlows } from "../data/logic";

export function useSaveFlow(options?: {
  onComplete?: () => void
}): [(flow: IFlow) => void, { loading?: boolean, flow?: IFlow }] {
  const [flow, setFlow] = useState<IFlow>()
  const [loading, setLoading] = useState<boolean>()

  const save = useCallback((fxFlow: IFlow) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allFlows.length; i++) {
        if (allFlows[i].id === fxFlow.id) {
          allFlows[i] = { ...allFlows[i], ...fxFlow }
          edit = true
          break
        }
      }

      if (!edit) {
        allFlows.push(fxFlow)
      }

      trigger(EVENT_DATA_CHANGED, Entities.Flow)
      setLoading(false)
      setFlow(fxFlow)
      console.log("===>allFlows", allFlows)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { flow, loading }]
}