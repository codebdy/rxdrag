import { ReactNode, memo, useCallback, useMemo, useState } from "react"
import { Toolbox, PropertyBox, Toolbar } from "./components"
import { useTransMaterialCategorys } from "./hooks/useTransMaterialCategorys"
import { EditorStore, ILogicMetas, IThemeToken, LogicFlowEditor } from "@rxdrag/minions-logicflow-editor"
import { ActivityMaterialCategory, IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema"
import { useToken } from "antd/es/theme/internal"
import { IComponents } from "@rxdrag/react-shared"
import { ThemeProvider } from "styled-components"

export type LogicFlowEditorAntd5InnerProps = {
  value: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  materialCategories: ActivityMaterialCategory<ReactNode>[],
  setters?: IComponents,
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
  token?: IThemeToken,
  toolbar?: false | React.ReactNode,
  //不传该参数，会构造一个默认的
  editorStore?: EditorStore
}

export const LogicMetaEditorAntd5Inner = memo((
  props: LogicFlowEditorAntd5InnerProps
) => {
  const { value, onChange, materialCategories, setters, logicFlowContext, canBeReferencedLogflowMetas, token: propToken, toolbar, editorStore } = props
  const [showMap, setShowMap] = useState(false);
  const [, token] = useToken();
  const categories = useTransMaterialCategorys(materialCategories);
  const materials = useMemo(() => {
    const materials: IActivityMaterial<ReactNode>[] = []
    return materials.concat(...categories.map(category => category.materials))
  }, [categories])

  const handleToggleShowMap = useCallback(() => {
    setShowMap(show => !show)
  }, [])

  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <LogicFlowEditor
        value={value}
        onChange={onChange}
        toolbar={toolbar === undefined ? <Toolbar showMap={showMap} toggleShowMap={handleToggleShowMap} /> : toolbar}
        toolbox={<Toolbox materialCategories={categories} />}
        propertyBox={<PropertyBox setters={setters} />}
        token={propToken || token}
        materials={materials}
        showMap={showMap}
        logicFlowContext={logicFlowContext}
        canBeReferencedLogflowMetas={canBeReferencedLogflowMetas}
        editorStore = {editorStore}
      />
    </ThemeProvider>
  )
})