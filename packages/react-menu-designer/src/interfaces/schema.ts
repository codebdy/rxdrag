import { ID } from "@rxdrag/shared";
import { IConfig, IMenuItemMeta } from "./menu";

//设计器用的Schema
export interface IMenuItemSchema<Config extends IConfig = IConfig> {
  meta: IMenuItemMeta<Config>,
  collapsed?: boolean,
  children?: ID[],
  parentId?: ID | null,
}

export interface IMenuSchema {
  rootIds: ID[],
  items: IMenuItemSchema[]
}