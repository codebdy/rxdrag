
import { ReactNode } from "react"
import { ActivityMaterialCategory } from "@rxdrag/minions-schema"
import { auxActivityCategory, basicActivityCategory, commonActivityCategory } from "@rxdrag/minions-react-materials"
import { fieldyActivityMaterialCategory } from "@rxdrag/fieldy-minions-materials"


export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  commonActivityCategory,
  fieldyActivityMaterialCategory,
  auxActivityCategory
]

// export const addOnMaterials:IActivityMaterial<ReactNode>[] = [
//   setPropMaterial,
//   reactionMaterial,
//   setVariableMaterial,
//   listenVariableMaterial,
//   readVariableMaterial
// ]

