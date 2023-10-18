import { memo, useMemo } from "react"
import { UmlEditorInner, UmlEditorProps } from "./UmlEditorInner"
import { RecoilRoot } from "recoil"
import { LocalesManager } from "@rxdrag/locales"
import { LocalesContext } from "@rxdrag/react-locales"
import { GlobalToken, theme } from "antd"
import { ThemeProvider } from "styled-components"

export const UmlEditor = memo((props: UmlEditorProps) => {
  const { themeMode, token: oldToken } = props
  const localesManager = useMemo(() => new LocalesManager(), [])
  const { token } = theme.useToken()
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