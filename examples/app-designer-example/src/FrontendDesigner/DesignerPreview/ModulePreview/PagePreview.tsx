import { ComponentRender, } from "@rxdrag/react-runner"
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react"
import { useDesignerEngine } from "@rxdrag/react-core"
import { useParams } from "react-router-dom"
import { pageMaterials } from "../../ModuleUiDesigner/materials"
import { isStr } from "@rxdrag/shared"
import { useModule } from "../../hooks/useModule"
import { useQueryModuleFlows } from "../../../hooks/useQueryModuleFlows"
import { useAppFrontend } from "../../../hooks/useAppFrontend"
import { FxScope, LogicType } from "../../../interfaces/flow"
import { useQueryFlows } from "../../../hooks/useQueryFlows"
import { LogicDefines, LogicDefinesContext } from "@rxdrag/minions-runtime-react"
import { useQueryModuleScripts } from "../../../hooks/useQueryModuleScripts"
import { useQueryScripts } from "../../../hooks/useQueryScripts"

//每次设计器画布修改，本预览组件都会刷新，后面要优化
export const PagePreview = memo(() => {
  const [tree, setTree] = useState<INodeSchema>()
  const engine = useDesignerEngine()
  const { device = "" } = useParams()
  const frontend = useAppFrontend()
  const module = useModule()
  const { flows } = useQueryModuleFlows(module?.id)
  const { scripts } = useQueryModuleScripts(module?.id)

  const { flows: moduleFxes } = useQueryFlows(module?.id, LogicType.fx, FxScope.module)
  const { flows: deviceFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { flows: appFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.app)

  const { scripts: moduleScriptFxes } = useQueryScripts(module?.id, LogicType.fx, FxScope.module)
  const { scripts: deviceScriptFxes } = useQueryScripts(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { scripts: appScriptFxes } = useQueryScripts(frontend?.app?.id, LogicType.fx, FxScope.app)

  const moduleFlows = useMemo(() => {
    return flows?.filter(flow => flow.ownerId === module?.id)
  }, [flows, module?.id])

  const fxFlows = useMemo(() => [...moduleFxes || [], ...deviceFxes || [], ...appFxes || []], [appFxes, deviceFxes, moduleFxes])

  const moduleScripts = useMemo(() => {
    return scripts?.filter(script => script.ownerId === module?.id)
  }, [scripts, module?.id])

  const fxScripts = useMemo(() => [...moduleScriptFxes || [], ...deviceScriptFxes || [], ...appScriptFxes || []], [appScriptFxes, deviceScriptFxes, moduleScriptFxes])

  const defines: LogicDefines = useMemo(() => ({
    flows,
    scripts,
    fxFlows,
    fxScripts,
  }), [flows, fxFlows, fxScripts, scripts])

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

  const makeTree = useCallback(() => {
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

  // 把各场景组合在一起渲染
  useEffect(() => {
    makeTree()
  }, [makeTree])

  const handleChange = useCallback(() => {
    makeTree()
  }, [makeTree])

  useEffect(() => {
    const unsub = engine?.getMonitor().subscribeToHasNodeChanged(handleChange)

    return () => {
      unsub?.()
    }
  }, [engine, handleChange])

  return (
    <LogicDefinesContext.Provider value={defines}>
      {
        tree
          ? <ComponentRender
            components={components}
            schema={tree}
            logicflowOptions={
              {
                variables: module?.variables,
                flows: moduleFlows,
                fxFlows: fxFlows,
                scripts: moduleScripts,
                fxScripts: fxScripts,
              }
            }
          />
          : <></>
      }
    </LogicDefinesContext.Provider>
  )
})