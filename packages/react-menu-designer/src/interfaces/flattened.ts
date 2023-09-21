import { ID } from "@rxdrag/shared";
import { IConfig, IMenuItemMeta } from "./menu";

//纯展示用模型
export interface IFlattenedItem<Config extends IConfig = IConfig> {
  depth: number;
  meta: IMenuItemMeta<Config>;
  collapsed?: boolean;
  children?: ID[]
}

//   //工具箱里的项目，要管理id，drop后要重新生成一个新的
// export interface IResourceItem{
//   id: UniqueIdentifier;
//   resource?: IMenuItemResource;
// }