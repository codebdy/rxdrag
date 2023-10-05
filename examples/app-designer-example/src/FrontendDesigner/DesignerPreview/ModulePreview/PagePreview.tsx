import { ComponentRender, } from "@rxdrag/react-runner"
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { Fragment, memo, useEffect, useMemo, useState } from "react"
import { useDesignerEngine } from "@rxdrag/react-core"
import { useParams } from "react-router-dom"
import { pageMaterials } from "../../ModuleUiDesigner/materials"
import { isStr } from "@rxdrag/shared"

export const PagePreview = memo(() => {

  const [tree, setTree] = useState<INodeSchema>()
  const engine = useDesignerEngine()
  const { device = "" } = useParams()
  
  const components = useMemo(() => {
    const materials = pageMaterials[device]
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
  }, [device])

  // 把各场景组合在一起渲染
  useEffect(() => {
    const docs = engine?.getAllDocuments()
    const tr: INodeSchema = {
      componentName: "Fragment",
      children: []
    }
    for (const doc of docs || []) {
      const subTree = doc?.getSchemaTree()
      if (subTree) {
        tr.children?.push(subTree)
      }
    }
    setTree(tr)
  }, [engine])

  console.log("刷新 PreviewRender", tree)

  return (
    tree
      ? <ComponentRender
        components={components}
        //controllerFactories={controllerFactories}
        schema={tree}
      />
      : <></>
  )
})