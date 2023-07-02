
import { ReactNode } from "react"
import { ActivityMaterialCategory } from "@rxdrag/minions-schema"
import { auxActivityCategory, basicActivityCategory, commonActivityCategory, controllerActivityCategory } from "@rxdrag/minions-react-materials"
import { fieldyActivityMaterialCategory } from "@rxdrag/fieldy-minions-materials"


export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  commonActivityCategory,
  fieldyActivityMaterialCategory,
  controllerActivityCategory,
  auxActivityCategory
]
