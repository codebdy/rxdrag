import { UniqueIdentifier } from "@dnd-kit/core";
import { IMenuItem } from "./menu";

export interface IFlattenedItem {
  id: UniqueIdentifier;
  parentId: UniqueIdentifier | null;
  depth: number;
  menuItem?: IMenuItem;
  collapsed?: boolean;
}

//   //工具箱里的项目，要管理id，drop后要重新生成一个新的
// export interface IResourceItem{
//   id: UniqueIdentifier;
//   resource?: IMenuItemResource;
// }