import { ReactComponent } from "@rxdrag/react-shared"
import { AdminUiToolbox } from "./AdminUiToolbox"
import { DeviceType } from "../../../../interfaces"
export const uiToolboxes: {
  [device: string]: ReactComponent
} = {
  [DeviceType.admin]: AdminUiToolbox
}
