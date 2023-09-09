import { appFronts } from "../data";
import { DeviceType } from "../interfaces";

export function useQueryFrontend(appId: string | undefined, device?: DeviceType) {
  return {
    frontend: appFronts.find(front => appId && front.app?.id === appId && front.deviceType === device)
  }
}