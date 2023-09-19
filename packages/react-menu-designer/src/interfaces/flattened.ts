import { IMenuItemMeta } from "./menu";

//纯展示用模型
export interface IFlattenedItem<Config = unknown> {
  depth: number;
  meta: IMenuItemMeta<Config>;
  collapsable?: boolean;
  collapsed?: boolean;
}

//   //工具箱里的项目，要管理id，drop后要重新生成一个新的
// export interface IResourceItem{
//   id: UniqueIdentifier;
//   resource?: IMenuItemResource;
// }