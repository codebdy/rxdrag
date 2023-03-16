import { useToolsTranslate, useRegisterComponentMaterial } from "@rxdrag/react-core"
import { materials, fields } from "materials"
import { FieldMaterial } from "materials/fields/Field"
import { memo, useEffect } from "react"
import { ResourceCollapsePannel } from "./ResourceCollapsePannel"
import { ResourcesTitle } from "./ResourcesTitle"

export const ResourceWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
  const t = useToolsTranslate()
  const registerMaterial = useRegisterComponentMaterial()
  //注册通用物料
  useEffect(() => {
    registerMaterial(FieldMaterial)
  }, [registerMaterial])

  return (
    <PaneContainer className="rx-resource-contianer" style={{ display: display ? undefined : "none" }}>
      <ResourcesTitle />
      <div style={{ flex: 1, overflow: "auto" }}>
        {
          materials.map((group => {
            return (
              <ResourceCollapsePannel key={group.titleKey} title={t(group.titleKey)} defaultExpand>
                {
                  group.items.map((material => {
                    return (
                      <ComponentResourceWidget key={material.componentName} meterial={material} />
                    )
                  }))
                }
              </ResourceCollapsePannel>
            )
          }))
        }
        <ResourceCollapsePannel title={t("fields")} defaultExpand>
          {
            fields.map(field => {
              return (
                <TemplateResourceWidget key={field.name} resource={field} />
              )
            })
          }
        </ResourceCollapsePannel>
      </div>
    </PaneContainer>
  )
})