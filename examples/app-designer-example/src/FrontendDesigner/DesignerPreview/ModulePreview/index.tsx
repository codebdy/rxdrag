import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { INodeSchema } from "@rxdrag/schema";
import { isStr } from "@rxdrag/shared";
import { Fragment, memo, useMemo } from "react"
import { frameMaterilas } from "../../UiFrameDesigner/materials";
import { ComponentRender } from "@rxdrag/react-runner";
import { PagePreview } from "./PagePreview";
import { useParams } from "react-router-dom";
import { message } from "antd";

export const ModulePreview = memo((
  props: {
    frameSchema: INodeSchema,
  }
) => {
  const { frameSchema } = props;
  const { device = "" } = useParams()
  const [messageApi, contextHolder] = message.useMessage();
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
      coms["Fragment"] = Fragment
    }
    return coms
  }, [device])

  const context = useMemo(() => {
    return {
      messageApi
    }
  }, [messageApi])

  
  return (
    <>
      {contextHolder}
      <ComponentRender
        components={frameComponents}
        schema={frameSchema}
        logicflowOptions={{ context }}
      />
    </>
  )
})