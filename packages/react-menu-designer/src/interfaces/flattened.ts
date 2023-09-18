import { Identifier } from "../dnd";
import { IMenuItemMeta } from "./menu";

export interface IFlattenedItem<Config = unknown> extends IMenuItemMeta<Config> {
  id: Identifier;
  parentId?: Identifier;
  depth: number;
  collapsed?: boolean;
  children?: Identifier[];
}

//   //工具箱里的项目，要管理id，drop后要重新生成一个新的
// export interface IResourceItem{
//   id: UniqueIdentifier;
//   resource?: IMenuItemResource;
// }