import { useRecoilValue } from "recoil";
import { useDesignerParams } from "plugin-sdk/contexts/desinger";
import { processesState } from "../recoil/atoms";

export function useProcesses() {
  const { app } = useDesignerParams()
  return useRecoilValue(processesState(app?.id))
}