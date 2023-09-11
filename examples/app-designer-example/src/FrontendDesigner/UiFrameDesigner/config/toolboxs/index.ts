import { ReactComponent } from "@rxdrag/react-shared"
import { DeviceType } from "../../../../interfaces"
import { AdminFrameToolbox } from "./AdminFrameToolbox"

export const frameToolboxes: {
  [device: string]: ReactComponent | undefined
} = {
  [DeviceType.admin]: AdminFrameToolbox
}

