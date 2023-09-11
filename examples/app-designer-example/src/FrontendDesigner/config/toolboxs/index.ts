import { ReactComponent } from "@rxdrag/react-shared"
import { DeviceType } from "../../../interfaces"
import { AdminUiToolbox } from "./AdminUiToolbox"
export const uiToolboxes: {
  [device: string]: ReactComponent
} = {
  [DeviceType.admin]: AdminUiToolbox
}
