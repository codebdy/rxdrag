import { GlobalToken, theme } from "antd"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components";
import { IWidgetStates, WidgetsContext } from "../../contexts";
import { IWidgetLayout } from "../../interfaces";

export const EditorScope = memo((
  props: {
    //用于从localstorage存取信息的key
    name?: string,
    children?: React.ReactNode,
  }
) => {
  const { name = "rx-inline-editor", children } = props;
  const [widgetStates, setWidgetStates] = useState<IWidgetStates>()

  useEffect(() => {
    //从localstorage里面取
    const storagedString = localStorage.getItem(name)
    if (storagedString) {
      const json = JSON.parse(storagedString)
      setWidgetStates(json)
    }
  }, [name])

  const handleUpdateWidget = useCallback((widgetName: string, state?: IWidgetLayout) => {
    setWidgetStates(states => {
      if (!states) {
        return undefined
      }
      const newStates = { ...states, widgets: { ...states.widgets, [widgetName]: state } }
      //往localstorage里面写
      localStorage.setItem(name, JSON.stringify(newStates))
      return newStates
    })
    //不要依赖于widgetStates
  }, [name])

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