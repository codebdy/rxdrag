import { IFrameCanvas } from "@rxdrag/react-antd-shell"
import { memo, useMemo } from "react"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { frameMaterilas } from "../UiFrameDesigner/materials"
import { pageMaterials } from "../ModuleUiDesigner/materials"
import { IReactComponents } from "@rxdrag/react-shared"

export const DesignerCanvas = memo(() => {
  const { device = "", layoutPart } = useParams()
  const designers = useMemo(() => {
    const materials = layoutPart === LayoutPart.frame ? frameMaterilas[device] : pageMaterials[device]
    const coms: IReactComponents = {}
    for (const material of materials || []) {
      coms[material.componentName] = material.designer
    }
    return coms
  }, [device, layoutPart])
  return (
    <IFrameCanvas designers={designers} />
  )
})