import { ID } from "@rxdrag/shared";

export interface IScript {
  id: string,
  title?: string,
  code?: string,
  //控制器的id
  scopedIn?: ID,
}