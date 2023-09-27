import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IFxScript } from "../interfaces/fx";
import { allFxScripts } from "../data/logic";

export function useSaveFxScript(options: {
  onComplate?: () => void
}): [(fxScript: IFxScript) => void, { loading?: boolean, fxScript?: IFxScript }] {
  const [fxScript, setFxScript] = useState<IFxScript>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((fxScript: IFxScript) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allFxScripts.length; i++) {
        if (allFxScripts[i].id === fxScript.id) {
          allFxScripts[i] = { ...allFxScripts[i], ...fxScript }
          edit = true
          break
        }
      }

      if(!edit){
        allFxScripts.push(fxScript)
      }

      trigger(EVENT_DATA_CHANGED, Entities.FxScript)
      setLoading(false)
      setFxScript(fxScript)
      options?.onComplate?.()
    }, 300)

  }, [options])

  return [save, { fxScript, loading }]
}