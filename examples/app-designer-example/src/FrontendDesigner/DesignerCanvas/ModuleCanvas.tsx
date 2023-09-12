import { memo, useMemo } from "react"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { frameMaterilas } from "../UiFrameDesigner/materials"
import { pageMaterials } from "../ModuleUiDesigner/materials"
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { isStr } from "@rxdrag/shared"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { Canvas, CanvasProxy } from "@rxdrag/react-core"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender } from "@rxdrag/react-runner"

export const DesignerCanvas = memo(() => {
  const appFront = useAppFrontend()
  const { device = "", layoutPart } = useParams()
  const designers = useMemo(() => {
    const materials = layoutPart === LayoutPart.frame ? frameMaterilas[device] : pageMaterials[device]
    const coms: IReactComponents = {}
    for (const material of materials || []) {
      coms[material.componentName] = material.designer
      for (const slotName of Object.keys(material.slots || {})) {
        const slot = material.slots?.[slotName]
        if (slot === true || slot === undefined || isStr(slot)) {
          continue
        }
        coms[slot.componentName] = slot.designer as ReactComponent
      }
    }
    return coms
  }, [device, layoutPart])

  const frameComponents = useMemo(() => {
    const materials = frameMaterilas[device]
    const coms: IReactComponents = {}
    for (const material of materials || []) {
      coms[material.componentName] = material.designer
      for (const slotName of Object.keys(material.slots || {})) {
        const slot = material.slots?.[slotName]
        if (slot === true || slot === undefined || isStr(slot)) {
          continue
        }
        coms[slot.componentName] = slot.component as ReactComponent
      }
    }
    return coms
  }, [device])

  return (
    <CanvasProxy components={designers}>
      {
        appFront?.frameSchema && layoutPart === LayoutPart.page
          ? <Fieldy>
            <VirtualForm>
              <ComponentRender
                components={frameComponents}
                //controllerFactories={controllerFactories}
                schema={appFront?.frameSchema}
              />
            </VirtualForm>
          </Fieldy>
          : <Canvas />
      }
    </CanvasProxy>
  )
})