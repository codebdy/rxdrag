import { ID } from "@rxdrag/shared";

export interface IScript {
  id: string,
  name?: string,
  code?: string,
  //控制器的id
  scopedIn?: ID,
}