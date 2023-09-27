import { useCallback, useState } from "react";
import { IModule } from "../interfaces/module";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { defaultModules } from "../data/mudules";

export function useSaveModule() {
  const [module, setModuel] = useState<IModule>()
  const [posting, setPosting] = useState<boolean>()
  const save = useCallback((module: IModule) => {
    setPosting(true)
    setTimeout(() => {
      for (const key of Object.keys(defaultModules)) {
        if (defaultModules[key]?.find(md => md.id === module.id)) {
          defaultModules[key] = defaultModules[key]?.map(md => md.id === module.id ? module : md)
        }
      }

      trigger(EVENT_DATA_CHANGED, Entities.Module)
      setPosting(false)
      setModuel(module)
    }, 500)

  }, [])

  return [save, { module, posting }]
}