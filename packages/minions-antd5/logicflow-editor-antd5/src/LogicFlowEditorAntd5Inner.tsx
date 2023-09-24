import { ReactNode, memo, useMemo } from "react"
import { Toolbox, PropertyBox, FlowToolbar } from "./components"
import { useTransMaterialCategories } from "./hooks/useTransMaterialCategories"
import { ILogicMetas, IThemeToken, LogicFlowEditor } from "@rxdrag/minions-logicflow-editor"
import { ActivityMaterialCategory, IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema"
import { IReactComponents } from "@rxdrag/react-shared"
import { MiniToolbar } from "./components/MiniToolbar"

export type LogicFlowEditorAntd5InnerProps = {
  value: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  materialCategories: ActivityMaterialCategory<ReactNode>[],
  setters?: IReactComponents,
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
  toolbar?: false | React.ReactNode,
  toolbox?: React.ReactNode | false,
}

export const LogicMetaEditorAntd5Inner = memo((
  props: LogicFlowEditorAntd5InnerProps & {
    token: IThemeToken,
  }
) => {
  const { value, onChange, materialCategories, setters, logicFlowContext, canBeReferencedLogflowMetas, token, toolbar, toolbox } = props
  const categories = useTransMaterialCategories(materialCategories);
  const materials = useMemo(() => {
    const materials: IActivityMaterial<ReactNode>[] = []
    return materials.concat(...categories.map(category => category.materials))
  }, [categories])

  return (
    <LogicFlowEditor
      value={value}
      onChange={onChange}
      toolbar={toolbar === undefined ? <FlowToolbar /> : toolbar}
      toolbox={toolbox !== false && (toolbox || <Toolbox materialCategories={categories} />)}
      propertyBox={<PropertyBox setters={setters} />}
      token={token}
      materials={materials}
      logicFlowContext={logicFlowContext}
      canBeReferencedLogflowMetas={canBeReferencedLogflowMetas}
    >
      <MiniToolbar />
    </LogicFlowEditor>
  )
})