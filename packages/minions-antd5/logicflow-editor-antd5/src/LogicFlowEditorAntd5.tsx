import { memo, ReactNode } from "react"
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
    materials: IActivityMaterial<ReactNode>[],
  } & LogicFlowEditorAntd5InnerProps & {
    token?: IThemeToken,
  }
) => {
  const { lang = "zh-CN", locales, materials, ...other } = props
  const [, token] = useToken();
  return (
    <LogicFlowEditorAntd5Scope
      lang={lang}
      locales={locales}
      token={token}
      materials={materials}
    >
      <LogicMetaEditorAntd5Inner  {...other} />
    </LogicFlowEditorAntd5Scope>
  )
})