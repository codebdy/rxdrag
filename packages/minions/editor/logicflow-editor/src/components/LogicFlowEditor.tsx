import { memo, useMemo } from "react"
import { LogicFlowEditorScope } from "./LogicFlowEditorScope";
import { LogicFlowEditorInner, LogicFlowEditorProps } from "./LogicFlowEditorInner";
import { ThemeProvider } from "styled-components";
import { IThemeToken } from "../interfaces";
import { ThemeTokenContext } from "../contexts";

export const LogicFlowEditor = memo((
  props: LogicFlowEditorProps
) => {
  const { token } = props
  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <LogicFlowEditorScope>
      <ThemeProvider theme={theme}>
        <ThemeTokenContext.Provider value={token}>
          <LogicFlowEditorInner {...props} />
        </ThemeTokenContext.Provider>
      </ThemeProvider>
    </LogicFlowEditorScope>
  )
})