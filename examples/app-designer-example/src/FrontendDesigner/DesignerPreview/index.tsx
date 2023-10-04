import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { Fragment, memo, useMemo } from "react"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { pageMaterials } from "../ModuleUiDesigner/materials"
import { frameMaterilas } from "../UiFrameDesigner/materials"
import { isStr } from "@rxdrag/shared"
import { PreviewIFrameProxy } from "@rxdrag/react-antd-shell/src/zoomable/ZoomablePreview"
import { ModulePreview } from "./ModulePreview"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { PagePreview } from "./ModulePreview/PagePreview"

export const DesignerPreview = memo(() => {
  const { device = "", layoutPart } = useParams()
  const appFront = useAppFrontend()

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
        coms["Fragment"] = Fragment
      }
    }
    return coms
  }, [device, layoutPart])

  return (
    <PreviewIFrameProxy>
      {
        appFront?.frameSchema && layoutPart === LayoutPart.module
          ? <ModulePreview
            frameSchema={appFront.frameSchema}
            components={components}
          />
          : <PagePreview
            components={components}
          />
      }
    </PreviewIFrameProxy>
  )
})