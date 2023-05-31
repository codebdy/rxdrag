import { ReactNode, memo, useCallback, useMemo, useState } from "react"
import { Toolbox, PropertyBox, Toolbar } from "./components"
import { useTransMaterialCategorys } from "./hooks/useTransMaterialCategorys"
import { ILogicMetas, LogicFlowEditor } from "@rxdrag/minions-logicflow-editor"
import { ActivityMaterialCategory, IActivityMaterial } from "@rxdrag/minions-schema"
import { useToken } from "antd/es/theme/internal"
import { IComponents } from "@rxdrag/react-shared"

export type LogicFlowEditorAntd5InnerProps = {
  value: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  materialCategories: ActivityMaterialCategory<ReactNode>[],
  setters?: IComponents,
}

export const LogicMetaEditorAntd5Inner = memo((
  props: LogicFlowEditorAntd5InnerProps
) => {
  const { value, onChange, materialCategories, setters } = props
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
  return (
    <LogicFlowEditor
      value={value}
      onChange={onChange}
      toolbar={<Toolbar showMap={showMap} toggleShowMap={handleToggleShowMap} />}
      toolbox={<Toolbox materialCategories={categories} />}
      propertyBox={<PropertyBox setters={setters} />}
      token={token}
      materials={materials}
      showMap={showMap}
    />
  )
})