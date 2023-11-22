import { IReactComponents } from "@rxdrag/react-shared";
import { largeScreenMaterials } from "./materials";

export const largeScreenDesigners: IReactComponents = {}

for (const material of largeScreenMaterials) {
  largeScreenDesigners[material.componentName] = material.designer
}