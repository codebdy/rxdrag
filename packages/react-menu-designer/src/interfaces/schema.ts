import { Identifier } from "../dnd";
import { IConfig, IMenuItemMeta } from "./menu";

//设计器用的Schema
export interface IMenuItemSchema<Config extends IConfig = IConfig> {
  meta: IMenuItemMeta<Config>,
  collapsed?: boolean,
  children?: Identifier[],
  parentId?: Identifier | null,
}

export interface IMenuSchema {
  rootIds: Identifier[],
  items: IMenuItemSchema[]
}