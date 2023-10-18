/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react"
import { IApp } from "../interfaces"
import { trigger, EVENT_DATA_CHANGED } from "./events"
import { Entities } from "./events/entityName"
import { defaultApp } from "../data"

export function useSaveApp(options: {
  onComplete?: () => void
}): [(frontend: IApp) => void, { loading?: boolean, app?: IApp }] {
  const [app, setApp] = useState<IApp>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((app: IApp) => {
    setLoading(true)
    setTimeout(() => {
      for (const key of Object.keys(defaultApp)) {
        if ((app as any)?.[key]) {
          (defaultApp as any)[key] = (app as any)[key]
        }
      }
      trigger(EVENT_DATA_CHANGED, Entities.App)
      setLoading(false)
      setApp(app)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { app, loading }]
}