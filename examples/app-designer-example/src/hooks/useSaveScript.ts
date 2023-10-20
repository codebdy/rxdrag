import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IScript } from "../interfaces/flow";
import { allScripts } from "../data/logic";

export function useSaveScript(options?: {
  onComplete?: () => void
}): [(script: IScript) => void, { loading?: boolean, script?: IScript }] {
  const [script, setScript] = useState<IScript>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((script: IScript) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allScripts.length; i++) {
        if (allScripts[i].id === script.id) {
          allScripts[i] = { ...allScripts[i], ...script }
          edit = true
          break
        }
      }

      if(!edit){
        allScripts.push(script)
      }

      trigger(EVENT_DATA_CHANGED, Entities.Script)
      setLoading(false)
      setScript(script)
      console.log("===>allScripts", allScripts)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { script: script, loading }]
}