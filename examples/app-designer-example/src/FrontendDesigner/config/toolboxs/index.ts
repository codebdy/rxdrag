import { ReactComponent } from "@rxdrag/react-shared"
import { DeviceType } from "../../../interfaces"
import { AdminFrameToolbox } from "./AdminFrameToolbox"
import { AdminUiToolbox } from "./AdminUiToolbox"
export const uiToolboxes: {
  [device: string]: ReactComponent
} = {
  [DeviceType.admin]: AdminUiToolbox
}

export const frameToolboxes: {
  [device: string]: ReactComponent
} = {
  [DeviceType.admin]: AdminFrameToolbox
}

