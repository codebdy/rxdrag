import { IOldControllerMeta } from "@rxdrag/minions-runtime-react";

export enum ActionType {
  list = "list",
  removeRecord = "removeRecord",
  submit = "submit",
  search = "search"
}

export interface IShortcutControllerMeta extends IOldControllerMeta {
  actionType?: ActionType,
  url?: string,
  entityName?: string,
}