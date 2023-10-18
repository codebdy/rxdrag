import { useCallback, useState } from "react";
import { IModule } from "../interfaces/module";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { defaultModules } from "../data/mudules";

export function useSaveModule(options?: {
  onComplete?: () => void
}): [(module: IModule) => void, { loading?: boolean, module?: IModule }] {
  const [module, setModuel] = useState<IModule>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((module: IModule) => {
    setLoading(true)
    setTimeout(() => {
      for (const key of Object.keys(defaultModules)) {
        if (defaultModules[key]?.find(md => md.id === module.id)) {
          defaultModules[key] = defaultModules[key]?.map(md => md.id === module.id ? module : md)
        }
      }

      trigger(EVENT_DATA_CHANGED, Entities.Module)
      setLoading(false)
      setModuel(module)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { module, loading }]
}