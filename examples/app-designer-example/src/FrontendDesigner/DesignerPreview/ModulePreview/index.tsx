import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { INodeSchema } from "@rxdrag/schema";
import { isStr } from "@rxdrag/shared";
import { memo, useMemo } from "react"
import { frameMaterilas } from "../../UiFrameDesigner/materials";
import { ComponentRender } from "@rxdrag/react-runner";
import { PagePreview } from "./PagePreview";
import { useParams } from "react-router-dom";

export const ModulePreview = memo((
  props: {
    components: IReactComponents
    frameSchema: INodeSchema,
  }
) => {
  const { frameSchema } = props;
  const { device = "" } = useParams()

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
      coms["Page"] = PagePreview
    }
    return coms
  }, [device])
  return (
    <ComponentRender
      components={frameComponents}
      //controllerFactories={controllerFactories}
      schema={frameSchema}
    />
  )
})