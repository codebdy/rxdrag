import { ILocales, RxDragLocalesManager } from "@rxdrag/locales"
import { LogicFlowEditorScope, LogicFlowEditorScopeProps } from "@rxdrag/minions-logicflow-editor"
import { LocalesContext } from "@rxdrag/react-locales"
import { memo, useEffect, useState } from "react"

export type LogicFlowEditorAntd5ScopeProps<T = unknown> = LogicFlowEditorScopeProps<T> & {
  lang?: string,
  locales?: ILocales,
  children?: React.ReactNode,
}

export const LogicFlowEditorAntd5Scope = memo((
  props: LogicFlowEditorAntd5ScopeProps
) => {
  const { lang = "zh-CN", locales, children, ...rest } = props
  const [localesManager] = useState(new RxDragLocalesManager(lang, locales))
  useEffect(() => {
    locales && localesManager.registerLocales(locales)
  }, [localesManager, locales])

  return (
    <LocalesContext.Provider value={localesManager}>
      <LogicFlowEditorScope {...rest}>
        {children}
      </LogicFlowEditorScope>
    </LocalesContext.Provider>
  )
})