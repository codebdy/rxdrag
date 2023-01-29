import { createContext } from "react";

export interface IActionMeta{

}

export type ActionHandler = (actionMeta?: IActionMeta) => boolean | void | Promise<boolean | void>

export interface IActionHandlers {
  [name: string]: ActionHandler | undefined
}

export const ActionHandlersContext = createContext<IActionHandlers | undefined>(undefined)