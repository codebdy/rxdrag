import { IActivityMaterial, IPorts } from "@rxdrag/minions-schema"
import { useCallback } from "react"
import { useTrans } from "./useTrans"

export function useTransMaterial() {
  const trans = useTrans()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translateMaterial = useCallback((material: IActivityMaterial<any, any, any, any>): IActivityMaterial<any> => {
    const ports: IPorts = {
      inPorts: [],
      outPorts: []
    }
    for (const port of material.defaultPorts?.inPorts || []) {
      ports.inPorts?.push({ ...port, label: trans(port.label) })
    }
    for (const port of material.defaultPorts?.outPorts || []) {
      ports.outPorts?.push({ ...port, label: trans(port.label) })
    }
    return { ...material, label: trans(material.label) || "", defaultPorts: ports }
  }, [trans])

  return translateMaterial
}