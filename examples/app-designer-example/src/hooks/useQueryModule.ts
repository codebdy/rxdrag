import { modules } from "../data/mudules";
import { DeviceType } from "../interfaces";

export function useQueryModule(device: DeviceType | undefined, moduleId: string) {

  return {
    module: !device ? undefined : modules[device]?.find(mod => mod.id === moduleId),
    loading: false,
  }
}