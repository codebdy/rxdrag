import { UniqueIdentifier } from "@dnd-kit/core";
import { IMenuItem } from "./menu";

export interface IFlattenedItem<Config = unknown> extends IMenuItem<Config> {
  parentId?: UniqueIdentifier | null;
  depth?: number;
  collapsed?: boolean;
  //拍平后不需要children
  children: undefined;
}

//   //工具箱里的项目，要管理id，drop后要重新生成一个新的
// export interface IResourceItem{
//   id: UniqueIdentifier;
//   resource?: IMenuItemResource;
// }