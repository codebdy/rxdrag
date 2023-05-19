import { IActivityMaterial } from "@rxdrag/minions-schema"
import { useCallback } from "react"
import { useTrans } from "./useTrans"

export function useTransMaterial(){
  const trans = useTrans()
  const translateMaterial = useCallback((material: IActivityMaterial) => {
    return { ...material, label: trans(material.label) || "" }
  }, [trans])

  return translateMaterial
}