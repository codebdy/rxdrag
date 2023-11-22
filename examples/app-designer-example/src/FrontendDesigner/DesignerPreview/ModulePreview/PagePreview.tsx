import { ComponentRender } from "@rxdrag/react-runner"
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
import { Page, PageProps } from "@rxdrag/react-antd-components"
import { message } from "antd"

//每次设计器画布修改，本预览组件都会刷新，后面要优化
export const PagePreview = memo((props: PageProps) => {
  const [tree, setTree] = useState<INodeSchema>()
  const engine = useDesignerEngine()
  const { device = "" } = useParams()
  const frontend = useAppFrontend()
  const { moduleId } = useParams()
  const { module } = useQueryModule(device as DeviceType, moduleId || "")
  const { scripts } = useQueryModuleScripts(moduleId)

  const { flows: moduleFxes, } = useQueryFlows(moduleId, LogicType.fx, FxScope.module)
  const { flows: deviceFxes, } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { flows: appFxes, } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.app)

  const { scripts: moduleScriptFxes } = useQueryScripts(moduleId, LogicType.fx, FxScope.module)
  const { scripts: deviceScriptFxes } = useQueryScripts(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { scripts: appScriptFxes } = useQueryScripts(frontend?.app?.id, LogicType.fx, FxScope.app)
  const fxLoaded = Boolean(moduleFxes && deviceFxes && appFxes);
  const [messageApi, contextHolder] = message.useMessage();

  const { flows } = useQueryModuleFlows(fxLoaded ? moduleId : undefined)

  const defines: LogicDefines | undefined = useMemo(() => {
    return ({
      flows,
      scripts,
      fxFlows: [...moduleFxes || [], ...deviceFxes || [], ...appFxes || []],
      fxScripts: [...moduleScriptFxes || [], ...deviceScriptFxes || [], ...appScriptFxes || []],
    })
  },
    [appFxes, appScriptFxes, deviceFxes, deviceScriptFxes, flows, moduleFxes, moduleScriptFxes, scripts])

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

  const context = useMemo(() => {
    return {
      messageApi
    }
  }, [messageApi])

  return (
    <Page {...props}>
      {contextHolder}
      {
        tree
          ? <ComponentRender
            components={components}
            schema={tree}
            logicflowOptions={
              {
                variables: module?.variables,
                ownerId: module?.id,
                logicDefines: defines,
                context,
              }
            }
          />
          : <></>
      }
    </Page>
  )
})