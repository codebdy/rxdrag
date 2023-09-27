import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IFxFlow } from "../interfaces/fx";
import { allFxFlows } from "../data/logic";

export function useSaveFxFlow(options: {
  onComplate?: () => void
}): [(fxFlow: IFxFlow) => void, { loading?: boolean, fxFlow?: IFxFlow }] {
  const [fxFlow, setFxFlow] = useState<IFxFlow>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((fxFlow: IFxFlow) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allFxFlows.length; i++) {
        if (allFxFlows[i].id === fxFlow.id) {
          allFxFlows[i] = { ...allFxFlows[i], ...fxFlow }
          edit = true
          break
        }
      }

      if(!edit){
        allFxFlows.push(fxFlow)
      }

      trigger(EVENT_DATA_CHANGED, Entities.FxFlow)
      setLoading(false)
      setFxFlow(fxFlow)
      options?.onComplate?.()
    }, 300)

  }, [options])

  return [save, { fxFlow, loading }]
}