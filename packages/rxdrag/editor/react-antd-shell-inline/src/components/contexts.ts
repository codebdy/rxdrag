import { createContext } from "react"

export interface IWidgetState {
  x?: number,
  y: number,
  width?: number,
  heiht?: number,
  //是否显示
  dispaly?: boolean,
}

export interface IWidgetStates {
  name: string,
  widgets: {
    [name: string]: IWidgetState | undefined
  }

  updateWidget: (name: string, state: IWidgetState) => void,
}

export const WidgetsContext = createContext<IWidgetStates | undefined>(undefined)