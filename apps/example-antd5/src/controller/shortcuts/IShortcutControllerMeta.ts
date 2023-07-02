import { IControllerMeta } from "@rxdrag/minions-runtime-react";

export enum ActionType {
  list = "list",
  removeRecord = "removeRecord",
  submit = "submit",
  search = "search"
}

export interface IShortcutControllerMeta extends IControllerMeta {
  actionType?: ActionType,
  url?: string,
  entityName?: string,
}