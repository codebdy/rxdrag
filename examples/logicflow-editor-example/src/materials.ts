
import { ReactNode } from "react"
import { ActivityMaterialCategory } from "@rxdrag/minions-schema"
import { auxActivityCategory, basicActivityCategory } from "minion-materials"
export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  auxActivityCategory
]
