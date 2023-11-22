import { IMaterial } from "@rxdrag/react-core"
import { DeviceType } from "../../../interfaces"
import { adminFrameMaterials } from "./admin"

export const frameMaterilas: {
  [device: string]: IMaterial[]|undefined
} = {
  [DeviceType.admin]: adminFrameMaterials
}
