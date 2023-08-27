import { createContext } from "react"
import { IWidgetLayout, WidgetNames } from "./interfaces"

export interface IWidgetStates {
  name: string,
  widgets: {
    [name: string]: IWidgetLayout | undefined
  }

  updateWidget: (name: string, state?: IWidgetLayout) => void,
}

export const defaultState: IWidgetStates = {
  name: "",
  widgets: {
    [WidgetNames.outline]: {
      closed: true,
    }
  },
  updateWidget: function (): void {
    throw new Error("Function not implemented.")
  }
}

export const WidgetsContext = createContext<IWidgetStates>(defaultState)