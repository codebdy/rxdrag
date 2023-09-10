import { modules } from "../data/mudules";
import { DeviceType } from "../interfaces";

export function useQueryModules(device: DeviceType | undefined) {
  return { modules: !device ? undefined : modules[device], loading: false }
}