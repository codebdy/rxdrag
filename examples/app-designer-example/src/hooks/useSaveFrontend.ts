import { useCallback, useState } from "react"
import { IAppFrontend } from "../interfaces"
import { trigger, EVENT_DATA_CHANGED } from "./events"
import { Entities } from "./events/entityName"
import { appFronts } from "../data"

export function useSaveFrontend(options: {
  onComplete?: () => void
}): [(frontend: IAppFrontend) => void, { loading?: boolean, frontend?: IAppFrontend }] {
  const [frontend, setFrontend] = useState<IAppFrontend>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((frontend: IAppFrontend) => {
    setLoading(true)
    setTimeout(() => {
      for (let i = 0; i < appFronts.length; i++) {
        if (appFronts[i].app?.id === frontend.app?.id && appFronts[i].deviceType === frontend.deviceType) {
          appFronts[i] = frontend;
        }
      }
      trigger(EVENT_DATA_CHANGED, Entities.AppFrontend)
      setLoading(false)
      setFrontend(frontend)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { frontend, loading }]
}