import { createContext } from "react"
import { IWidgetLayout } from "./interfaces"

export interface IWidgetStates {
  name: string,
  widgets: {
    [name: string]: IWidgetLayout | undefined
  }

  updateWidget: (name: string, state?: IWidgetLayout) => void,
}

export const WidgetsContext = createContext<IWidgetStates | undefined>(undefined)