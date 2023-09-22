import { IComponentMaterial } from "@rxdrag/react-core"
import { DeviceType } from "../../../interfaces"
import { adminFrameMaterials } from "./admin"

export const frameMaterilas: {
  [device: string]: IComponentMaterial[]|undefined
} = {
  [DeviceType.admin]: adminFrameMaterials
}
