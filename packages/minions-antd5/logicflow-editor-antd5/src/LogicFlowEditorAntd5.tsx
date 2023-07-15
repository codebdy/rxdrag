import { memo, useState, useEffect, useMemo } from "react"
import { LogicFlowEditorAntd5InnerProps, LogicMetaEditorAntd5Inner } from "./LogicFlowEditorAntd5Inner"
import { ILocales, LocalesManager } from "@rxdrag/locales"
import { LocalesContext } from "@rxdrag/react-locales"
import { ThemeProvider } from "styled-components"
import { useToken } from "antd/es/theme/internal"
import { IThemeToken } from "@rxdrag/minions-logicflow-editor"

export const LogicFlowEditorAntd5 = memo((
  props: {
    lang?: string,
    locales?: ILocales,
  } & LogicFlowEditorAntd5InnerProps
) => {
  const { lang = "zh-CN", locales, token: propToken, ...other } = props
  const [, token] = useToken();

  const [localesManager] = useState(new LocalesManager(lang, locales))
  useEffect(() => {
    locales && localesManager.registerLocales(locales)
  }, [localesManager, locales])

  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token: propToken || token
    }
  }, [propToken, token])

  return (
    <LocalesContext.Provider value={localesManager}>
      <ThemeProvider theme={theme}>
        <LogicMetaEditorAntd5Inner token={propToken||token } {...other} />
      </ThemeProvider>
    </LocalesContext.Provider>
  )
})