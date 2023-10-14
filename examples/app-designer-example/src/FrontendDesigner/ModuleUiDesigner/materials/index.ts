import { IMaterial } from "@rxdrag/react-core"
import { DeviceType } from "../../../interfaces"
import { adminPageMaterials } from "./admin/adminPageMaterials"

export const pageMaterials: {
  [device: string]: IMaterial[]|undefined
} = {
  [DeviceType.admin]: adminPageMaterials
}
