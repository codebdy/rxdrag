
import { ReactNode } from "react"
import { ActivityMaterialCategory } from "@rxdrag/minions-schema"
import { basicActivityCategory, auxActivityCategory } from "./minion-materials"
export const activityMaterialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  auxActivityCategory
]
