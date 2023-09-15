import { UniqueIdentifier } from "@dnd-kit/core";
import { IMenuItemMaterial } from "./material";
import { IMenuItem } from "./menu";

export interface IFlattenedItem {
  id: UniqueIdentifier;
  parentId: UniqueIdentifier | null;
  depth: number;
  menuItem?: IMenuItem;
  //新增时使用，id必须跟toolbox里面的id一致，要不然不显示拖放动画
  material?: IMenuItemMaterial;
  collapsed?: boolean;
}
