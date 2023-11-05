import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender } from "@rxdrag/react-runner"
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { isStr } from "@rxdrag/shared"
import { Fragment, memo, useMemo } from "react"
import { frameMaterilas } from "../../UiFrameDesigner/materials"
import { PageCanvas } from "./PageCanvas"
import { useParams } from "react-router-dom"
import { INodeSchema } from "@rxdrag/schema"

export const ModuleCanvas = memo((
  props: {
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
      coms["Page"] = PageCanvas
      coms["Fragment"] = Fragment
    }
    return coms
  }, [device])

  return (
    <Fieldy>
      <VirtualForm>
        <ComponentRender
          components={frameComponents}
          schema={frameSchema}
        />
      </VirtualForm>
    </Fieldy>
  )
})