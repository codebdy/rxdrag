import { createContext } from "react";
import { IActionMeta } from "../interfaces";

export type ActionHandler = (actionMeta?: IActionMeta) => boolean | void | Promise<boolean | void>

export interface IActionHandlers {
  [name: string]: ActionHandler | undefined
}

export const ActionHandlersContext = createContext<IActionHandlers | undefined>(undefined)