import { ComponentResourceWidget, PaneContainer, TemplateResourceWidget } from "@rxdrag/react-antd-shell"
import { useSettersTranslate } from "@rxdrag/react-core"
import { memo } from "react"
import { ResourceCollapsePanel } from "./ResourceCollapsePanel"
import { ResourcesTitle } from "./ResourcesTitle"
import { resources, fields } from "../materials"

export const ResourceWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
  const t = useSettersTranslate()
  //const registerMaterial = useRegisterComponentMaterials()
  //注册通用物料
  // useEffect(() => {
  //   registerMaterial(FieldMaterial)
  // }, [registerMaterial])

  return (
    <PaneContainer className="rx-resource-container" style={{ display: display ? undefined : "none" }}>
      <ResourcesTitle />
      <div style={{ flex: 1, overflow: "auto" }}>
        {
          resources.map((group => {
            return (
              <ResourceCollapsePanel key={group.titleKey} title={t(group.titleKey)} defaultExpand>
                {
                  group.items.map((name => {
                    return (
                      <ComponentResourceWidget key={name} name={name} />
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