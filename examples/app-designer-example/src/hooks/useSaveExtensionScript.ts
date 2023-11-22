import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IExtendsionScript } from "../interfaces/extension";
import { allScriptExtensions } from "../data/extension-script";

export function useSaveExtensionScript(options?: {
  onComplete?: () => void
}): [(script: IExtendsionScript) => void, { loading?: boolean, script?: IExtendsionScript }] {
  const [script, setScript] = useState<IExtendsionScript>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((script: IExtendsionScript) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allScriptExtensions.length; i++) {
        if (allScriptExtensions[i].id === script.id) {
          allScriptExtensions[i] = { ...allScriptExtensions[i], ...script }
          edit = true
          break
        }
      }

      if(!edit){
        allScriptExtensions.push(script)
      }

      trigger(EVENT_DATA_CHANGED, Entities.ExtensionScript)
      setLoading(false)
      setScript(script)
      console.log("===>allScriptExtensions", allScriptExtensions)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { script: script, loading }]
}