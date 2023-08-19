import { GlobalToken, theme } from "antd"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components";
import { IWidgetState, IWidgetStates, WidgetsContext } from "../contexts";

export const EditorScope = memo((
  props: {
    //用于从localstorage存取信息的key
    name?: string,
    children?: React.ReactNode,
  }
) => {
  const { name = "rx-inline-editor", children } = props;
  const [widgetStates, setWidgetStates] = useState<IWidgetStates>()

  const handleUpdateWidget = useCallback((name: string, state: IWidgetState) => {
    if (widgetStates) {
      setWidgetStates({ ...widgetStates, widgets: { ...widgetStates.widgets, [name]: state } })
    }
  }, [widgetStates])

  useEffect(() => {
    setWidgetStates({
      name,
      widgets: {},
      updateWidget: handleUpdateWidget,
    })
  }, [handleUpdateWidget, name])

  const { token } = theme.useToken()
  const themeValue: { token: GlobalToken } = useMemo(() => {
    return {
      token: token,
    }
  }, [token])

  return (
    <ThemeProvider theme={themeValue}>
      <WidgetsContext.Provider value={widgetStates}>
        {children}
      </WidgetsContext.Provider>
    </ThemeProvider>
  )
})