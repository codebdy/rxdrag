import { IActivityMaterial } from "@rxdrag/minions-schema"
import { ReactNode, useCallback } from "react"
import { useTrans } from "./useTrans"

export function useTransMaterial() {
  const trans = useTrans()
  const translateMaterial = useCallback((material: IActivityMaterial<ReactNode>): IActivityMaterial<ReactNode> => {
    return { ...material, label: trans(material.label) || "" }
  }, [trans])

  return translateMaterial
}