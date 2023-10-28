import { ReactNode, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { Button, Spin, Tooltip, theme } from "antd"
import { FunctionOutlined, ControlOutlined, CloseOutlined, PartitionOutlined, NodeIndexOutlined } from "@ant-design/icons"
import { FXes } from "./FXes"
import { Flows } from "./Flows"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"
import { PanelTitle } from "../common/PanelTitle"
import { LogicFlowEditorAntd5Scope, Toolbox } from "@rxdrag/logicflow-editor-antd5"
import { ActivityMaterialCategory, IActivityMaterial } from "@rxdrag/minions-schema"
import { useDesignerEngine, useThemeMode } from "@rxdrag/react-core"
import { ComponentTree } from "./ComponentTree"
import { ID } from "@rxdrag/shared"
import { NavButton } from "../common/NavButton"
import { FlowEditor } from "./FlowEditor"
import { Variables } from "./Variables"
import { useModule } from "../../hooks/useModule"
import { useQueryFlow } from "../../../hooks/useQueryFlow"
import { controllerActivities, arrayActivities, variableActivities, activityMaterialLocales, activityMaterialCategories, LogicflowContextParam, fxFlowMaterial, basicActivityCategory, commonActivityCategory, auxActivityCategory } from "@rxdrag/minions-react-materials"
import { useAppFrontend } from "../../../hooks/useAppFrontend"
import { useQueryFlows } from "../../../hooks/useQueryFlows"
import { LogicType, FxScope } from "../../../interfaces/flow"
import { logicflowIcon, modelIcon, variableIcon } from "@rxdrag/react-shared"
import { entityActivityMaterials } from "../../../minions/materials"
import _ from "lodash"
import { entityActivityMaterialLocales } from "../../../minions/materials/locales"
import { ModelTree } from "./ModelTree"
import { IEntitiesContext } from "../../../minions/contexts"
import { useEntities } from "../../hooks/useEntities"

const Content = styled.div`
  flex: 1;
  position: relative;
`

enum NavType {
  componentTree = "componentTree",
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
  model = "model",
  variables = "variables"
}

export const materialCategories: ActivityMaterialCategory<ReactNode>[] = [
  basicActivityCategory,
  { ...commonActivityCategory, materials: [...commonActivityCategory.materials, ...entityActivityMaterials] },
  auxActivityCategory
]


export const FlowDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)
  const [selectedFlow, setSelectedFolw] = useState<ID>()
  const [selectedFx, setSelectedFx] = useState<ID>()
  const engine = useDesignerEngine()
  const { flow, loading } = useQueryFlow(selectedFlow || selectedFx || "")
  const { token } = theme.useToken()
  const themMode = useThemeMode()
  const module = useModule()
  const frontend = useAppFrontend()

  const { flows: moduleFxes } = useQueryFlows(module?.id, LogicType.fx, FxScope.module)
  const { flows: deviceFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { flows: appFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.app)
  console.log("===>module", module)
  const entities = useEntities()
  const allFxFlows = useMemo(() => [...moduleFxes || [], ...deviceFxes || [], ...appFxes || []],
    [appFxes, deviceFxes, moduleFxes]
  )

  const materials = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materials: IActivityMaterial<ReactNode>[] = [...entityActivityMaterials, ...(controllerActivities as any), ...arrayActivities, ...variableActivities, fxFlowMaterial]
    return materials.concat(...activityMaterialCategories.map(category => category.materials))
  }, [])

  const handleToggleComponents = useCallback(() => {
    setNavType(type => type === NavType.componentTree ? null : NavType.componentTree)
  }, [])

  const handleToggleModel = useCallback(() => {
    setNavType(type => type === NavType.model ? null : NavType.model)
  }, [])

  const handleToggleToolbox = useCallback(() => {
    setNavType(type => type === NavType.toolbox ? null : NavType.toolbox)
  }, [])

  const handleToggleVariables = useCallback(() => {
    setNavType(type => type === NavType.variables ? null : NavType.variables)
  }, [])

  const handleToggleFlows = useCallback(() => {
    setNavType(type => type === NavType.flows ? null : NavType.flows)
  }, [])

  const handleToggleFxes = useCallback(() => {
    setNavType(type => type === NavType.fxes ? null : NavType.fxes)
  }, [])

  const handleCloseLeft = useCallback(() => {
    setNavType(null)
  }, [])

  const handleSelectFlow = useCallback((id: ID) => {
    setSelectedFolw(id)
    setSelectedFx(undefined)
  }, [])

  const handleSelectFx = useCallback((id: ID) => {
    setSelectedFolw(undefined)
    setSelectedFx(id)
  }, [])

  const logicFlowContextParam: LogicflowContextParam & IEntitiesContext = useMemo(() => ({
    engine,
    variables: module?.variables,
    fxFlowMetas: allFxFlows,
    entities: entities,
  }), [allFxFlows, engine, entities, module?.variables])

  return (
    <LogicFlowEditorAntd5Scope
      themMode={themMode}
      token={token}
      materials={materials}
      locales={_.merge(activityMaterialLocales, entityActivityMaterialLocales)}
      logicFlowContext={logicFlowContextParam}
    >
      <Container>
        <LeftNav>
          <Tooltip title="元件箱" placement="right">
            <NavButton
              type={navType === NavType.toolbox ? "primary" : "text"}
              icon={<ControlOutlined />}
              onClick={handleToggleToolbox}
            />
          </Tooltip>
          <Tooltip title="组件树" placement="right">
            <NavButton
              type={navType === NavType.componentTree ? "primary" : "text"}
              icon={<PartitionOutlined />}
              onClick={handleToggleComponents}
            />
          </Tooltip>
          <Tooltip title="领域模型" placement="right">
            <NavButton
              type={navType === NavType.model ? "primary" : "text"}
              icon={modelIcon}
              onClick={handleToggleModel}
            />
          </Tooltip>
          <Tooltip title="变量" placement="right">
            <NavButton
              type={navType === NavType.variables ? "primary" : "text"}
              icon={variableIcon}
              onClick={handleToggleVariables}
            />
          </Tooltip>
          <Tooltip title="行为流" placement="right">
            <NavButton
              type={
                navType === NavType.flows
                  ? "primary"
                  : (selectedFlow ? "link" : "text")
              }
              className={selectedFlow ? "intermediate" : undefined}
              icon={logicflowIcon}
              onClick={handleToggleFlows}
            />
          </Tooltip>
          <Tooltip title="子流" placement="right">
            <NavButton
              type={
                navType === NavType.fxes
                  ? "primary"
                  : (selectedFx ? "link" : "text")
              }
              className={selectedFx ? "intermediate" : undefined}
              icon={<FunctionOutlined />}
              onClick={handleToggleFxes}
            />
          </Tooltip>
        </LeftNav>
        <LeftColumn
          width={260}
          maxWidth={500}
          minWidth={160}
          className={!navType ? "hidden" : undefined}
        >
          <PanelTitle>
            {
              NavType.componentTree === navType &&
              <span>
                组件树
              </span>
            }
            {
              NavType.toolbox === navType &&
              <span>
                元件箱
              </span>
            }
            {
              NavType.model === navType &&
              <span>
                领域模型
              </span>
            }
            {
              NavType.variables === navType &&
              <span>
                变量
              </span>
            }
            {
              NavType.flows === navType &&
              <span>
                行为流
              </span>
            }
            {
              NavType.fxes === navType &&
              <span>
                子编排
              </span>
            }
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={handleCloseLeft}
            />
          </PanelTitle>
          {
            navType === NavType.toolbox &&
            <Toolbox materialCategories={materialCategories} />
          }
          <ComponentTree
            flow={flow}
            display={navType === NavType.componentTree}
          />
          <ModelTree
            display={navType === NavType.model}
          />
          <Flows
            display={navType === NavType.flows}
            selected={selectedFlow}
            onSelect={handleSelectFlow}
          />
          <Variables
            display={navType === NavType.variables}
          />
          <FXes
            display={navType === NavType.fxes}
            moduleFxes={moduleFxes}
            deviceFxes={deviceFxes}
            appFxes={appFxes}
            selected={selectedFx}
            onSelect={handleSelectFx}
          />
        </LeftColumn>
        <Content>
          {
            (selectedFlow || selectedFx) &&
            <FlowEditor
              flow={flow}
              icon={selectedFx ? <FunctionOutlined /> : <NodeIndexOutlined />}
            />
          }
          {
            loading && <Spin spinning={loading} />
          }
        </Content>
      </Container>
    </LogicFlowEditorAntd5Scope>
  )
})