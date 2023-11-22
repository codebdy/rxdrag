import { ID } from "@rxdrag/shared";
import { useCallback } from "react";
import { IProcess } from "../../../interfaces/process";


export function useGetCategoryProcesses(processes?:IProcess[]) {
  const getProcesses = useCallback((categoryId?: ID) => {
    return processes?.filter(process => process.categoryId === categoryId)
  }, [processes]);

  return getProcesses
}