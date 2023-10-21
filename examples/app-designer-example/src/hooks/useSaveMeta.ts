import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { allMetas } from "../data/meta";
import { IMeta } from "../interfaces/meta";

export function useSaveMeta(options?: {
  onComplete?: () => void
}): [(meta: IMeta) => void, { loading?: boolean, meta?: IMeta }] {
  const [meta, setMeta] = useState<IMeta>()
  const [loading, setLoading] = useState<boolean>()

  const save = useCallback((meta: IMeta) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allMetas.length; i++) {
        if (allMetas[i].id === meta.id) {
          allMetas[i] = { ...allMetas[i], ...meta }
          edit = true
          break
        }
      }

      if (!edit) {
        allMetas.push(meta)
      }

      trigger(EVENT_DATA_CHANGED, Entities.Meta)
      setLoading(false)
      setMeta(meta)
      console.log("===>allMetas", allMetas)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { meta, loading }]
}