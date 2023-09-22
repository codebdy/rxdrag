import { defaultModules } from "../data/mudules";
import { DeviceType } from "../interfaces";

export function useQueryModules(device: DeviceType | undefined) {
  return { modules: !device ? undefined : defaultModules[device], loading: false }
}