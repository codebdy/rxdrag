import { ID } from "@rxdrag/shared";
import { useCallback, useState } from "react";
import { trigger, EVENT_DATA_CHANGED } from "./events";
import { Entities } from "./events/entityName";
import { allProcessCategories } from "../data/process";

export function useRemoveProcessCategory(
  options?: {
    onComplete?: () => void
  }
): [(id: ID) => void, { loading?: boolean }] {
  const [loading, setLoading] = useState<boolean>()
  const remove = useCallback((id?: ID) => {
    setLoading(true)
    setTimeout(() => {
      const script = allProcessCategories.find(category => category.id === id)
      if (script) {
        allProcessCategories.splice(allProcessCategories.indexOf(script), 1)
        trigger(EVENT_DATA_CHANGED, Entities.ProcessCategory)
      }
      setLoading(false)
      options?.onComplete?.()
    }, 300)
  }, [options])

  return [remove, { loading }]
}