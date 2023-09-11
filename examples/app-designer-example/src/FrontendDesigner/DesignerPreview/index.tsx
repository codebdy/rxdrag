import { IFramePreview } from "@rxdrag/react-antd-shell"
import { ControllerFactories } from "@rxdrag/react-runner"
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { controllerDefines } from "example-common"
import { memo, useMemo } from "react"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { pageMaterials } from "../ModuleUiDesigner/materials"
import { frameMaterilas } from "../UiFrameDesigner/materials"
import { isStr } from "@rxdrag/shared"

export const DesignerPreview = memo(() => {
  const { device = "", layoutPart } = useParams()

  const controllerFactories = useMemo(() => {
    const factories: ControllerFactories = {}
    for (const ctrlDef of controllerDefines) {
      factories[ctrlDef.name] = ctrlDef.factory
    }
    return factories
  }, [])

  const components = useMemo(() => {
    const materials = layoutPart === LayoutPart.frame ? frameMaterilas[device] : pageMaterials[device]
    const coms: IReactComponents = {}
    for (const material of materials || []) {
      coms[material.componentName] = material.component
      for (const slotName of Object.keys(material.slots || {})) {
        const slot = material.slots?.[slotName]
        if (slot === true || slot === undefined || isStr(slot)) {
          continue
        }
        coms[slot.componentName] = slot.component as ReactComponent
      }
    }
    return coms
  }, [device, layoutPart])
  return (
    <IFramePreview components={components} controllerFactories={controllerFactories} />
  )
})