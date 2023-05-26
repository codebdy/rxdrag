
import { ReactNode } from "react"
import { auxReactions } from "./auxtools"
import { basicReactions } from "./basic"
import { commonReactions } from "./common"
import { ActivityMaterialCategory, IActivityMaterial } from "@rxdrag/minions-schema"
import { setPropMaterial, reactionMaterial, setVariableMaterial, listenVariableMaterial, readVariableMaterial } from "./controller"


export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  {
    name: '$basicReactions',
    materials: basicReactions,
  },
  {
    name: '$commonReactions',
    materials: commonReactions,
  },
  // {
  //   name: '$dataModel',
  //   materials: dataModelReactions,
  // },
  {
    name: "$auxTools",
    materials: auxReactions,
  }
]

export const addOnMaterials:IActivityMaterial<ReactNode>[] = [
  setPropMaterial,
  reactionMaterial,
  setVariableMaterial,
  listenVariableMaterial,
  readVariableMaterial
]

