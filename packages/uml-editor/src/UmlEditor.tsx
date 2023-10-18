import { memo, useEffect, useMemo } from "react"
import { UmlEditorInner, UmlEditorProps } from "./UmlEditorInner"
import { RecoilRoot } from "recoil"
import { LocalesManager } from "@rxdrag/locales"
import { LocalesContext } from "@rxdrag/react-locales"
import { GlobalToken, theme } from "antd"
import { ThemeProvider } from "styled-components"
import { umlEditorLocales } from "./locales"

export const UmlEditor = memo((props: UmlEditorProps) => {
  const { themeMode, lang, locales, token: oldToken } = props
  const localesManager = useMemo(() => new LocalesManager(undefined, umlEditorLocales), [])
  const { token } = theme.useToken()

  useEffect(() => {
    if (lang) {
      localesManager.setLang(lang)
    }
  }, [lang, localesManager])

  useEffect(() => {
    if (locales) {
      localesManager.registerLocales(locales)
    }
  }, [locales, localesManager])

  const themeValue: { token: GlobalToken } = useMemo(() => {
    return {
      mode: themeMode,
      token: oldToken || token
    }
  }, [oldToken, themeMode, token])

  return <RecoilRoot>
    <ThemeProvider theme={themeValue}>
      <LocalesContext.Provider value={localesManager}>
        <UmlEditorInner {...props} />
      </LocalesContext.Provider>
    </ThemeProvider>
  </RecoilRoot>
})

UmlEditor.displayName = "UmlEditor"