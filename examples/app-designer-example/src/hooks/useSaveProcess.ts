import { useCallback, useState } from "react";
import { EVENT_DATA_CHANGED, trigger } from "./events";
import { Entities } from "./events/entityName";
import { IProcess } from "../interfaces/process";
import { allProcesses } from "../data/process";

export function useSaveProcess(options?: {
  onComplete?: () => void
}): [(process: IProcess) => void, { loading?: boolean, process?: IProcess }] {
  const [process, setProcess] = useState<IProcess>()
  const [loading, setLoading] = useState<boolean>()
  const save = useCallback((process: IProcess) => {
    setLoading(true)
    setTimeout(() => {
      let edit = false
      for (let i = 0; i < allProcesses.length; i++) {
        if (allProcesses[i].id === process.id) {
          allProcesses[i] = { ...allProcesses[i], ...process }
          edit = true
          break
        }
      }

      if (!edit) {
        allProcesses.push(process)
      }

      trigger(EVENT_DATA_CHANGED, Entities.Process)
      setLoading(false)
      setProcess(process)
      console.log("===>allProcesses", allProcesses)
      options?.onComplete?.()
    }, 300)

  }, [options])

  return [save, { process, loading }]
}