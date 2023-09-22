import { IComponentMaterial } from "@rxdrag/react-core"
import { DeviceType } from "../../../interfaces"
import { adminPageMaterials } from "./admin/adminPageMaterials"

export const pageMaterials: {
  [device: string]: IComponentMaterial[]|undefined
} = {
  [DeviceType.admin]: adminPageMaterials
}
