import { ReactNode, memo, useMemo } from "react"
import { Toolbox, PropertyBox, Toolbar } from "./components"
import { useTransMaterialCategorys } from "./hooks/useTransMaterialCategorys"
import { ILogicMetas, IThemeToken, LogicFlowEditor } from "@rxdrag/minions-logicflow-editor"
import { ActivityMaterialCategory, IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema"
import { IComponents } from "@rxdrag/react-shared"
import { MiniToolbar } from "./components/MiniToolbar"

export type LogicFlowEditorAntd5InnerProps = {
  value: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  materialCategories: ActivityMaterialCategory<ReactNode>[],
  setters?: IComponents,
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
  token: IThemeToken,
  toolbar?: false | React.ReactNode,
}

export const LogicMetaEditorAntd5Inner = memo((
  props: LogicFlowEditorAntd5InnerProps
) => {
  const { value, onChange, materialCategories, setters, logicFlowContext, canBeReferencedLogflowMetas, token, toolbar } = props
  const categories = useTransMaterialCategorys(materialCategories);
  const materials = useMemo(() => {
    const materials: IActivityMaterial<ReactNode>[] = []
    return materials.concat(...categories.map(category => category.materials))
  }, [categories])

  return (
    <LogicFlowEditor
      value={value}
      onChange={onChange}
      toolbar={toolbar === undefined ? <Toolbar /> : toolbar}
      toolbox={<Toolbox materialCategories={categories} />}
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