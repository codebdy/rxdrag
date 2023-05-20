import { memo, useState, useEffect } from "react"
import { LogicFlowEditorAntd5InnerProps, ControllerMetaEditorAntd5Inner } from "./LogicFlowEditorAntd5Inner"
import { ILocales, LocalesManager } from "@rxdrag/locales"
import { LocalesContext } from "@rxdrag/react-locales"

export const LogicFlowEditorAntd5 = memo((
  props: {
    lang?: string,
    locales?: ILocales,
  } & LogicFlowEditorAntd5InnerProps
) => {
  const { lang = "zh-CN", locales, ...other } = props
  const [localesManager] = useState(new LocalesManager(lang, locales))
  useEffect(() => {
    locales && localesManager.registerLocales(locales)
  }, [localesManager, locales])

  return (
    <LocalesContext.Provider value={localesManager}>
      <ControllerMetaEditorAntd5Inner {...other} />
    </LocalesContext.Provider>
  )
})