import { IReactionMaterial } from "runner/minions/interfaces/material"
import { auxReactions } from "./auxtools"
import { basicReactions } from "./basic"
import { commonReactions } from "./common"
import { controllerReactions } from "./controller"
import { dataModelReactions } from "./model"

export interface MaterialCategory {
  name: string,
  materials: IReactionMaterial[]
}

export const reactionMaterialCategories: MaterialCategory[] = [
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
  const materials: IReactionMaterial[] = [...controllerReactions]
  return materials.concat(...reactionMaterialCategories.map(category => category.materials))
}