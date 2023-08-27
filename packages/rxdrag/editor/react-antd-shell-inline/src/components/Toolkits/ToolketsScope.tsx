import { memo, useCallback, useEffect, useState } from "react"
import { IWidgetStates, WidgetsContext, defaultState } from "../../contexts";
import { IWidgetLayout } from "../../interfaces";

export const ToolketsScope = memo((
  props: {
    //用于从localstorage存取信息的key
    name?: string,
    children?: React.ReactNode,
  }
) => {
  const { name = "rx-inline-editor", children } = props;
  const [widgetStates, setWidgetStates] = useState<IWidgetStates>(defaultState)

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
      const newStates = { ...states, widgets: { ...states.widgets, [widgetName]: state } }
      //往localstorage里面写
      localStorage.setItem(name, JSON.stringify(newStates))
      return newStates
    })
    //不要依赖于widgetStates
  }, [name])

  useEffect(() => {
    setWidgetStates({
      ...defaultState,
      name,
      updateWidget: handleUpdateWidget,
    })
  }, [handleUpdateWidget, name])

  return (
    <WidgetsContext.Provider value={widgetStates}>
      {children}
    </WidgetsContext.Provider>
  )
})