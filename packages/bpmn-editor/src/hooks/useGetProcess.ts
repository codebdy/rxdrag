import { useCallback } from "react";
import { ID } from "shared";
import { useProcesses } from "./useProcesses";

export function useGetProcess() {
  const processes = useProcesses();
  const getProcess = useCallback((id?: ID) => {
    return processes?.find(page => page.id === id)
  }, [processes]);

  return getProcess;
}