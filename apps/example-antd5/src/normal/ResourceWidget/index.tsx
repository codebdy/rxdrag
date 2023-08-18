import { ComponentResourceWidget, PaneContainer, TemplateResourceWidget } from "@rxdrag/react-antd-shell"
import { useSettersTranslate, useRegisterComponentMaterial } from "@rxdrag/react-core"
import { materials, fields } from "normal/materials"
import { memo, useEffect } from "react"
import { FieldMaterial } from "@rxdrag/react-antd-materials"
import { ResourceCollapsePanel } from "./ResourceCollapsePanel"
import { ResourcesTitle } from "./ResourcesTitle"

export const ResourceWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
  const t = useSettersTranslate()
  const registerMaterial = useRegisterComponentMaterial()
  //注册通用物料
  useEffect(() => {
    registerMaterial(FieldMaterial)
  }, [registerMaterial])

  return (
    <PaneContainer className="rx-resource-container" style={{ display: display ? undefined : "none" }}>
      <ResourcesTitle />
      <div style={{ flex: 1, overflow: "auto" }}>
        {
          materials.map((group => {
            return (
              <ResourceCollapsePanel key={group.titleKey} title={t(group.titleKey)} defaultExpand>
                {
                  group.items.map((material => {
                    return (
                      <ComponentResourceWidget key={material.componentName} material={material} />
                    )
                  }))
                }
              </ResourceCollapsePanel>
            )
          }))
        }
        <ResourceCollapsePanel title={t("fields")} defaultExpand>
          {
            fields.map(field => {
              return (
                <TemplateResourceWidget key={field.name} resource={field} />
              )
            })
          }
        </ResourceCollapsePanel>
      </div>
    </PaneContainer>
  )
})