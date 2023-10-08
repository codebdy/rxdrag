import { ComponentRender, LogicflowRoot, } from "@rxdrag/react-runner"
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react"
import { useDesignerEngine } from "@rxdrag/react-core"
import { useParams } from "react-router-dom"
import { pageMaterials } from "../../ModuleUiDesigner/materials"
import { isStr } from "@rxdrag/shared"
import { useQueryModuleFlows } from "../../../hooks/useQueryModuleFlows"
import { useAppFrontend } from "../../../hooks/useAppFrontend"
import { FxScope, LogicType } from "../../../interfaces/flow"
import { useQueryFlows } from "../../../hooks/useQueryFlows"
import { LogicDefines } from "@rxdrag/minions-runtime-react"
import { useQueryModuleScripts } from "../../../hooks/useQueryModuleScripts"
import { useQueryScripts } from "../../../hooks/useQueryScripts"
import { useQueryModule } from "../../../hooks/useQueryModule"
import { DeviceType } from "../../../interfaces"

//每次设计器画布修改，本预览组件都会刷新，后面要优化
export const PagePreview = memo(() => {
  const [tree, setTree] = useState<INodeSchema>()
  const engine = useDesignerEngine()
  const { device = "" } = useParams()
  const frontend = useAppFrontend()
  const { moduleId } = useParams()
  const { module } = useQueryModule(device as DeviceType, moduleId || "")
  const { flows } = useQueryModuleFlows(moduleId)
  const { scripts } = useQueryModuleScripts(moduleId)

  const { flows: moduleFxes } = useQueryFlows(moduleId, LogicType.fx, FxScope.module)
  const { flows: deviceFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { flows: appFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.app)

  const { scripts: moduleScriptFxes } = useQueryScripts(moduleId, LogicType.fx, FxScope.module)
  const { scripts: deviceScriptFxes } = useQueryScripts(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { scripts: appScriptFxes } = useQueryScripts(frontend?.app?.id, LogicType.fx, FxScope.app)

  const fxFlows = useMemo(() => [...moduleFxes || [], ...deviceFxes || [], ...appFxes || []], [appFxes, deviceFxes, moduleFxes])
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
    <LogicflowRoot defines={defines}>
      {
        tree
          ? <ComponentRender
            components={components}
            schema={tree}
            logicflowOptions={
              {
                variables: module?.variables,
                ownerId: module?.id,
              }
            }
          />
          : <></>
      }
    </LogicflowRoot>
  )
})