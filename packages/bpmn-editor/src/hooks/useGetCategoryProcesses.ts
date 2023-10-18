import { useCallback } from "react";
import { ID } from "shared";
import { useProcesses } from "./useProcesses";

export function useGetCategoryProcesses() {
  const processes = useProcesses();
  const getProcesses = useCallback((categoryUuid?: ID) => {
    return processes?.filter(process => process.categoryUuid === categoryUuid)
  }, [processes]);

  return getProcesses
}