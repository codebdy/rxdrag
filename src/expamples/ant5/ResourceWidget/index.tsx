import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo, useEffect } from "react"
import { ResourceCollapsePannel } from "expamples/ant5/ResourceWidget/ResourceCollapsePannel"
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer"
import { ResourcesTitle } from "expamples/ant5/ResourceWidget/ResourcesTitle"
import { ComponentResourceWidget } from "react-shells/ant5/widgets/ComponentResourceWidget"
import { businessMaterials, displayMaterials, fomrMaterials, inputMaterials, layoutMaterials } from "../materials"
import { useRegisterComponentMaterial } from "core-react/hooks/useRegisterComponentMaterial"
import { FieldMaterial } from "../materials/fields/Field"

export const ResourceWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
  const t = useToolsTranslate()
  const registerMaterial = useRegisterComponentMaterial()
  //注册通用物料
  useEffect(()=>{
    registerMaterial(FieldMaterial)
  }, [registerMaterial])
  
  return (
    <PaneContainer className="rx-resource-contianer" style={{ display: display ? undefined : "none" }}>
      <ResourcesTitle />
      <div style={{ flex: 1, overflow: "auto" }}>
        <ResourceCollapsePannel title={t("inputs")} defaultExpand>
          {
            inputMaterials.map((material => {
              return (
                <ComponentResourceWidget key={material.componentName} meterial={material} />
              )
            }))
          }
        </ResourceCollapsePannel>
        <ResourceCollapsePannel title={t("displays")} defaultExpand>
          {
            displayMaterials.map((material => {
              return (
                <ComponentResourceWidget key={material.componentName} meterial={material} />
              )
            }))
          }
        </ResourceCollapsePannel>
        <ResourceCollapsePannel title={t("forms")} defaultExpand>
          {
            fomrMaterials.map((material => {
              return (
                <ComponentResourceWidget key={material.componentName} meterial={material} />
              )
            }))
          }
        </ResourceCollapsePannel>

        <ResourceCollapsePannel title={t("layouts")} defaultExpand>
          {
            layoutMaterials.map((material => {
              return (
                <ComponentResourceWidget key={material.componentName} meterial={material} />
              )
            }))
          }
        </ResourceCollapsePannel>
        <ResourceCollapsePannel title={t("business")} defaultExpand>
          {
            businessMaterials.map((material => {
              return (
                <ComponentResourceWidget key={material.componentName} meterial={material} />
              )
            }))
          }
        </ResourceCollapsePannel></div>
    </PaneContainer>
  )
})