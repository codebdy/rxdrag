
import { ReactNode } from "react"
import { auxReactions } from "./auxtools"
import { basicReactions } from "./basic"
import { commonReactions } from "./common"
import { controllerReactions } from "./controller"
import { ActivityMaterialCategory, IActivityMaterial } from "@rxdrag/minions-schema"


export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  {
    name: '$basicReactions',
    materials: basicReactions,
  },
  {
    name: '$commonReactions',
    materials: commonReactions,
  },
  {
    name: '$dataModel',
    materials: dataModelReactions,
  },
  {
    name: "$auxTools",
    materials: auxReactions,
  }
]

export const getAllMaterial = () => {
  const materials: IActivityMaterial<ReactNode>[] = [...controllerReactions]
  return materials.concat(...activityMaterialCategories.map(category => category.materials))
}