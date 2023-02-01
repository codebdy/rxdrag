import { IReactionMaterial } from "runner/reaction/interfaces/material"
import { basicReactions } from "./basic"
import { commonReactions } from "./common"
import { dataModelReactions } from "./dataModel"

export interface MaterialCategory {
  name: string,
  materials: IReactionMaterial[]
}

export const reactionMaterials: MaterialCategory[] = [
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
]