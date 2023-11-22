import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IProcessCategory } from "../interfaces/process";
import { allProcessCategories } from "../data/process";

export function useSaveProcessCategory(options?: {
  onComplete?: () => void
}): [(category: IProcessCategory) => void, { loading?: boolean, category?: IProcessCategory }] {
  const [category, setCategory] = useState<IProcessCategory>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((category: IProcessCategory) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allProcessCategories.length; i++) {
        if (allProcessCategories[i].id === category.id) {
          allProcessCategories[i] = { ...allProcessCategories[i], ...category }
          edit = true
          break
        }
      }

      if(!edit){
        allProcessCategories.push(category)
      }

      trigger(EVENT_DATA_CHANGED, Entities.ProcessCategory)
      setLoading(false)
      setCategory(category)
      console.log("===>allProcessCategories", allProcessCategories)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { category, loading }]
}