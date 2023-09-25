import { ReactNode, memo, useMemo } from "react"
import { LogicFlowEditorAntd5InnerProps, LogicMetaEditorAntd5Inner } from "./LogicFlowEditorAntd5Inner"
import { ILocales } from "@rxdrag/locales"
import { useToken } from "antd/es/theme/internal"
import { IThemeToken } from "@rxdrag/minions-logicflow-editor"
import { LogicFlowEditorAntd5Scope } from "./LogicFlowEditorAntd5Scope"
import { IActivityMaterial } from "@rxdrag/minions-schema"

export const LogicFlowEditorAntd5 = memo((
  props: {
    lang?: string,
    locales?: ILocales,
  } & LogicFlowEditorAntd5InnerProps & {
    token?: IThemeToken,
  }
) => {
  const { lang = "zh-CN", locales, materialCategories, ...other } = props
  const [, token] = useToken();
  const materials = useMemo(() => {
    const materials: IActivityMaterial<ReactNode>[] = []
    return materials.concat(...materialCategories.map(category => category.materials))
  }, [materialCategories])


  return (
    <LogicFlowEditorAntd5Scope
      lang={lang}
      locales={locales}
      token={token}
      materials={materials}
    >
      <LogicMetaEditorAntd5Inner materialCategories={materialCategories}  {...other} />
    </LogicFlowEditorAntd5Scope>
  )
})